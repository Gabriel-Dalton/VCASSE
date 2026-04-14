(function () {
  var data = window.VCASSE_EVENTS_DATA;
  if (!data || !data.events) return;

  var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  var weekdayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  var eventsByDay = {};
  data.events.forEach(function (ev) {
    if (!eventsByDay[ev.date]) eventsByDay[ev.date] = [];
    eventsByDay[ev.date].push(ev);
  });

  var root = document.getElementById('eventsCalendarRoot');
  var monthLabel = document.getElementById('eventsCalendarMonthLabel');
  var prevBtn = document.getElementById('eventsCalendarPrev');
  var nextBtn = document.getElementById('eventsCalendarNext');
  var selectedPanel = document.getElementById('eventsCalendarSelected');
  var vcasseEl = document.getElementById('vcasseEventCards');
  var communityEl = document.getElementById('communityEventCards');
  var lumaLinks = document.querySelectorAll('a.events-luma-link');

  if (data.lumaCalendarUrl) {
    lumaLinks.forEach(function (a) {
      a.href = data.lumaCalendarUrl;
    });
  }

  var today = new Date();
  var viewYear = today.getFullYear();
  var viewMonth = today.getMonth();
  var selectedDateStr = null;

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function formatISO(y, m, d) {
    return y + '-' + pad(m + 1) + '-' + pad(d);
  }

  var todayStr = formatISO(today.getFullYear(), today.getMonth(), today.getDate());
  if (eventsByDay[todayStr] && eventsByDay[todayStr].length) {
    selectedDateStr = todayStr;
  }

  function parseISO(s) {
    var p = s.split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function daysInMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }

  function renderCalendar() {
    if (!root) return;
    var y = viewYear;
    var m = viewMonth;
    if (monthLabel) {
      monthLabel.textContent = monthNames[m] + ' ' + y;
    }

    var first = new Date(y, m, 1);
    var startPad = (first.getDay() + 6) % 7;
    var dim = daysInMonth(y, m);
    var cells = [];

    for (var i = 0; i < startPad; i++) {
      cells.push({ type: 'empty' });
    }
    for (var d = 1; d <= dim; d++) {
      cells.push({ type: 'day', day: d, iso: formatISO(y, m, d) });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ type: 'empty' });
    }

    var html = '<div class="events-cal-weekdays" role="row">';
    weekdayShort.forEach(function (w) {
      html += '<div class="events-cal-weekday" role="columnheader">' + w + '</div>';
    });
    html += '</div><div class="events-cal-grid" role="grid">';

    cells.forEach(function (cell, idx) {
      if (idx % 7 === 0) html += '<div class="events-cal-row" role="row">';
      if (cell.type === 'empty') {
        html += '<div class="events-cal-cell events-cal-cell--empty" role="gridcell"></div>';
      } else {
        var has = eventsByDay[cell.iso] && eventsByDay[cell.iso].length;
        var isToday =
          cell.iso ===
          formatISO(today.getFullYear(), today.getMonth(), today.getDate());
        var isSel = selectedDateStr === cell.iso;
        var classes = ['events-cal-cell', 'events-cal-cell--day'];
        if (has) classes.push('events-cal-cell--has-events');
        if (isToday) classes.push('events-cal-cell--today');
        if (isSel) classes.push('events-cal-cell--selected');
        html +=
          '<button type="button" class="' +
          classes.join(' ') +
          '" role="gridcell" data-date="' +
          cell.iso +
          '" aria-label="' +
          (has ? 'Events on ' : '') +
          cell.iso +
          '">' +
          '<span class="events-cal-daynum">' +
          cell.day +
          '</span>';
        if (has) {
          html += '<span class="events-cal-dots" aria-hidden="true">';
          eventsByDay[cell.iso].forEach(function (ev, j) {
            if (j > 2) return;
            html +=
              '<span class="events-cal-dot events-cal-dot--' + ev.type + '"></span>';
          });
          html += '</span>';
        }
        html += '</button>';
      }
      if (idx % 7 === 6) html += '</div>';
    });
    html += '</div>';
    root.innerHTML = html;

    root.querySelectorAll('.events-cal-cell--day').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedDateStr = btn.getAttribute('data-date');
        renderCalendar();
        renderSelectedDay();
      });
    });
  }

  function renderSelectedDay() {
    if (!selectedPanel) return;
    if (!selectedDateStr) {
      selectedPanel.innerHTML =
        '<p class="events-cal-selected-placeholder">Select a date on the calendar to see what is scheduled.</p>';
      return;
    }
    var list = eventsByDay[selectedDateStr];
    var pretty = parseISO(selectedDateStr).toLocaleDateString('en-CA', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    if (!list || !list.length) {
      selectedPanel.innerHTML =
        '<p class="events-cal-selected-date">' +
        pretty +
        '</p><p class="events-cal-selected-empty">No listed events on this day.</p>';
      return;
    }
    var h =
      '<p class="events-cal-selected-date">' +
      pretty +
      '</p><ul class="events-cal-selected-list">';
    list.forEach(function (ev) {
      var pill =
        ev.type === 'vcasse'
          ? '<span class="publication-pill publication-pill--vcasse">VCASSE</span>'
          : '<span class="publication-pill publication-pill--community">Vancouver pick</span>';
      h += '<li>';
      h += pill;
      h += '<strong>' + escapeHtml(ev.title) + '</strong>';
      h += '<span class="events-cal-selected-meta">' + escapeHtml(ev.time) + ' · ' + escapeHtml(ev.location) + '</span>';
      if (ev.blurb) h += '<span class="events-cal-selected-blurb">' + escapeHtml(ev.blurb) + '</span>';
      h += '</li>';
    });
    h += '</ul>';
    selectedPanel.innerHTML = h;
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function sortEvents(arr) {
    return arr.slice().sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return 0;
    });
  }

  function renderCard(ev) {
    var pill =
      ev.type === 'vcasse'
        ? '<span class="publication-pill publication-pill--vcasse">VCASSE event</span>'
        : '<span class="publication-pill publication-pill--community">Vancouver pick</span>';
    var datePretty = parseISO(ev.date).toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    var link = '';
    if (ev.url) {
      link =
        '<a class="modern-card-link" href="' +
        escapeHtml(ev.url) +
        '" target="_blank" rel="noopener noreferrer">Details <span aria-hidden="true">↗</span></a>';
    }
    return (
      '<article class="publication-card">' +
      '<div class="publication-card-meta">' +
      pill +
      '<span>' +
      datePretty +
      '</span>' +
      '<span>' +
      escapeHtml(ev.time) +
      '</span>' +
      '</div>' +
      '<h3>' +
      escapeHtml(ev.title) +
      '</h3>' +
      '<p>' +
      escapeHtml(ev.blurb) +
      '</p>' +
      '<ul class="publication-tags"><li>' +
      escapeHtml(ev.location) +
      '</li></ul>' +
      (link || '') +
      '</article>'
    );
  }

  function renderLists() {
    var vc = sortEvents(data.events.filter(function (e) { return e.type === 'vcasse'; }));
    var co = sortEvents(data.events.filter(function (e) { return e.type === 'community'; }));
    if (vcasseEl) vcasseEl.innerHTML = vc.map(renderCard).join('');
    if (communityEl) communityEl.innerHTML = co.map(renderCard).join('');
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      viewMonth--;
      if (viewMonth < 0) {
        viewMonth = 11;
        viewYear--;
      }
      renderCalendar();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      viewMonth++;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear++;
      }
      renderCalendar();
    });
  }

  renderCalendar();
  renderSelectedDay();
  renderLists();
})();
