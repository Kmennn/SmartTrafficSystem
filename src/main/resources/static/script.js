// ===== FORM SUBMISSION =====
const form = document.getElementById('checkerForm');
const submitBtn = document.getElementById('submitBtn');
const resultCard = document.getElementById('resultCard');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.classList.add('loading');
  resultCard.classList.add('hidden');

  const payload = {
    vehicleId: document.getElementById('vehicleId').value.trim(),
    speed: parseFloat(document.getElementById('speed').value),
    zone: document.getElementById('zone').value.trim(),
    emergency: document.getElementById('emergency').checked
  };

  try {
    const res = await fetch('/traffic/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    showResult(data, payload);
    loadViolations();
  } catch (err) {
    // null response means no violation
    showResult(null, payload);
  }

  submitBtn.classList.remove('loading');
});

function showResult(data, payload) {
  const card = document.getElementById('resultCard');
  const icon = document.getElementById('resultIcon');
  const title = document.getElementById('resultTitle');
  const msg = document.getElementById('resultMsg');
  const fineSection = document.getElementById('resultFine');
  const fineValue = document.getElementById('fineValue');
  const details = document.getElementById('resultDetails');

  card.classList.remove('hidden', 'violation', 'safe');

  if (data && data.fine) {
    card.classList.add('violation');
    icon.textContent = '🚨';
    title.textContent = 'Violation Detected!';
    msg.textContent = 'This vehicle exceeded the speed limit. A fine has been issued and saved to the database.';
    fineSection.classList.remove('hidden');
    fineValue.textContent = '₹' + data.fine.toLocaleString();
    details.classList.remove('hidden');
    document.getElementById('detVehicle').textContent = data.vehicleId;
    document.getElementById('detSpeed').textContent = data.speed + ' km/h';
    document.getElementById('detZone').textContent = data.zone;
  } else {
    card.classList.add('safe');
    icon.textContent = '✅';
    title.textContent = 'No Violation';
    if (payload.emergency) {
      msg.textContent = 'Emergency vehicle — automatically exempted from speed checks.';
    } else {
      msg.textContent = 'Vehicle is within the speed limit (≤ 80 km/h). No fine issued.';
    }
    fineSection.classList.add('hidden');
    details.classList.add('hidden');
  }
}

// ===== LOAD VIOLATIONS TABLE =====
async function loadViolations() {
  try {
    const res = await fetch('/traffic/violations');
    const data = await res.json();

    const tableEmpty = document.getElementById('tableEmpty');
    const table = document.getElementById('violTable');
    const body = document.getElementById('violBody');
    const countEl = document.getElementById('totalCount');
    const finesEl = document.getElementById('totalFines');
    const avgEl = document.getElementById('avgSpeed');

    if (!data || data.length === 0) {
      tableEmpty.classList.remove('hidden');
      table.classList.add('hidden');
      countEl.textContent = '0';
      finesEl.textContent = '₹0';
      avgEl.textContent = '—';
      return;
    }

    tableEmpty.classList.add('hidden');
    table.classList.remove('hidden');

    // Stats
    const totalFines = data.reduce((s, v) => s + v.fine, 0);
    const avgSpeed = (data.reduce((s, v) => s + v.speed, 0) / data.length).toFixed(1);
    countEl.textContent = data.length;
    finesEl.textContent = '₹' + totalFines.toLocaleString();
    avgEl.textContent = avgSpeed + ' km/h';

    // Table rows
    body.innerHTML = '';
    data.reverse().forEach((v, i) => {
      const fineClass = v.fine >= 5000 ? 'high' : v.fine >= 2000 ? 'mid' : 'low';
      const row = document.createElement('tr');
      row.innerHTML =
        '<td>' + (data.length - i) + '</td>' +
        '<td>' + v.vehicleId + '</td>' +
        '<td><span class="speed-val">' + v.speed + ' km/h</span></td>' +
        '<td>' + v.zone + '</td>' +
        '<td><span class="fine-badge ' + fineClass + '">₹' + v.fine.toLocaleString() + '</span></td>';
      body.appendChild(row);
    });
  } catch (err) {
    console.error('Failed to load violations:', err);
  }
}

// ===== REFRESH BUTTON =====
document.getElementById('refreshBtn').addEventListener('click', function () {
  this.classList.add('spinning');
  loadViolations();
  setTimeout(() => this.classList.remove('spinning'), 600);
});

// ===== LOAD ON PAGE START =====
loadViolations();
