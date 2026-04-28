// ===== HUD CLOCK =====
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('hudClock').textContent = h + ':' + m + ':' + s;
}
setInterval(updateClock, 1000);
updateClock();

// ===== EMERGENCY TOGGLE LABEL =====
document.getElementById('emergency').addEventListener('change', function () {
  document.getElementById('switchVal').textContent = this.checked ? 'AFFIRMATIVE' : 'NEGATIVE';
});

// ===== FORM SUBMISSION =====
const form = document.getElementById('checkerForm');
const submitBtn = document.getElementById('submitBtn');
const resultCard = document.getElementById('resultCard');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  submitBtn.classList.add('loading');
  resultCard.classList.add('hidden');

  var payload = {
    vehicleId: document.getElementById('vehicleId').value.trim(),
    speed: parseFloat(document.getElementById('speed').value),
    zone: document.getElementById('zone').value.trim(),
    emergency: document.getElementById('emergency').checked
  };

  try {
    var res = await fetch('/traffic/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      var text = await res.text();
      if (text && text.trim().length > 0) {
        var data = JSON.parse(text);
        showResult(data, payload);
      } else {
        showResult(null, payload);
      }
    } else {
      showResult(null, payload);
    }
    loadViolations();
  } catch (err) {
    showResult(null, payload);
  }

  submitBtn.classList.remove('loading');
});

function showResult(data, payload) {
  var card = document.getElementById('resultCard');
  var tag = document.getElementById('intelTag');
  var idEl = document.getElementById('intelId');
  var msg = document.getElementById('resultMsg');
  var fineSection = document.getElementById('resultFine');
  var fineValue = document.getElementById('fineValue');
  var details = document.getElementById('resultDetails');

  card.classList.remove('hidden', 'threat', 'clear');
  card.className = 'intel-card';

  var timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  if (data && data.fine) {
    card.classList.add('threat');
    tag.textContent = 'HOSTILE IDENTIFIED';
    tag.className = 'intel-tag hostile';
    idEl.textContent = timestamp;
    msg.textContent = 'Speed violation confirmed. Target exceeded limit in designated sector. Penalty has been logged to database.';
    fineSection.classList.remove('hidden');
    fineValue.textContent = 'Rs. ' + data.fine.toLocaleString();
    details.classList.remove('hidden');
    document.getElementById('detVehicle').textContent = data.vehicleId;
    document.getElementById('detSpeed').textContent = data.speed + ' KM/H';
    document.getElementById('detZone').textContent = data.zone;
  } else {
    card.classList.add('clear');
    tag.textContent = 'ALL CLEAR';
    tag.className = 'intel-tag friendly';
    idEl.textContent = timestamp;
    if (payload.emergency) {
      msg.textContent = 'Emergency unit identified. Target is exempt from speed enforcement protocols.';
    } else {
      msg.textContent = 'Target operating within permitted speed parameters. No violation to report.';
    }
    fineSection.classList.add('hidden');
    details.classList.add('hidden');
  }
}

// ===== LOAD VIOLATIONS =====
async function loadViolations() {
  try {
    var res = await fetch('/traffic/violations');
    var data = await res.json();

    var tableEmpty = document.getElementById('tableEmpty');
    var table = document.getElementById('violTable');
    var body = document.getElementById('violBody');
    var countEl = document.getElementById('totalCount');
    var finesEl = document.getElementById('totalFines');
    var avgEl = document.getElementById('avgSpeed');

    if (!data || data.length === 0) {
      tableEmpty.classList.remove('hidden');
      table.classList.add('hidden');
      countEl.textContent = '0';
      finesEl.textContent = 'Rs. 0';
      avgEl.textContent = '--';
      return;
    }

    tableEmpty.classList.add('hidden');
    table.classList.remove('hidden');

    var totalFines = data.reduce(function (s, v) { return s + v.fine; }, 0);
    var avgSpeed = (data.reduce(function (s, v) { return s + v.speed; }, 0) / data.length).toFixed(1);
    countEl.textContent = data.length;
    finesEl.textContent = 'Rs. ' + totalFines.toLocaleString();
    avgEl.textContent = avgSpeed;

    body.innerHTML = '';
    data.reverse().forEach(function (v, i) {
      var tierClass = v.fine >= 5000 ? 'tier3' : v.fine >= 2000 ? 'tier2' : 'tier1';
      var row = document.createElement('tr');
      row.innerHTML =
        '<td>' + (data.length - i) + '</td>' +
        '<td>' + v.vehicleId + '</td>' +
        '<td><span class="speed-hot">' + v.speed + '</span></td>' +
        '<td>' + v.zone + '</td>' +
        '<td><span class="fine-tag ' + tierClass + '">Rs. ' + v.fine.toLocaleString() + '</span></td>';
      body.appendChild(row);
    });
  } catch (err) {
    console.error('Intel fetch failed:', err);
  }
}

// ===== REFRESH =====
document.getElementById('refreshBtn').addEventListener('click', function () {
  loadViolations();
});

// ===== INIT =====
loadViolations();
