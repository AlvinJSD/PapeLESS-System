// ─── MODULE SWITCHER ───────────────────────────────────────────────────────────
function showModule(moduleId) {
  if (moduleId === "Logout") {
    window.location.href = "index.html";
    return;
  }

  document.querySelectorAll(".module").forEach(m => m.classList.remove("active-module"));

  const active = document.getElementById(moduleId);
  if (active) active.classList.add("active-module");
}


// ─── SUBMISSION HISTORY ────────────────────────────────────────────────────────

// In-memory store (replace with real backend calls as needed)
const submissions = [
  { type: 'Attendance',  file: 'Attendance_April.xlsx', date: 'Apr 10, 2025', status: 'approved', remarks: 'Reviewed by Adviser' },
  { type: 'OJT Journal', file: 'Journal_Week1.docx',    date: 'Apr 14, 2025', status: 'pending',  remarks: 'Waiting for review' },
  { type: 'Report',      file: 'FinalReport_Draft.pdf', date: 'Apr 18, 2025', status: 'rejected', remarks: 'Needs correction on page 3' },
];

function statusLabel(s) {
  const map = { approved: 'Approved', pending: 'Pending', rejected: 'Revision' };
  return map[s] || s;
}

function renderTable() {
  const tbody = document.getElementById('submissionBody');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('submissionCount');

  count.textContent = submissions.length + ' submission' + (submissions.length !== 1 ? 's' : '');

  if (submissions.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  tbody.innerHTML = submissions.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${s.type}</td>
      <td><span class="file-name-badge">📎 ${s.file}</span></td>
      <td>${s.date}</td>
      <td><span class="status ${s.status}">${statusLabel(s.status)}</span></td>
      <td><small class="text-muted">${s.remarks}</small></td>
    </tr>
  `).join('');
}

function handleSubmit() {
  const type    = document.getElementById('docTypeSelect').value;
  const dateVal = document.getElementById('submitDateInput').value;
  const fileEl  = document.getElementById('fileInput');
  const file    = fileEl.files[0];

  if (!file)    { alert('Please select a file to upload.'); return; }
  if (!dateVal) { alert('Please select a date.'); return; }

  const formattedDate = new Date(dateVal).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  submissions.push({
    type,
    file:    file.name,
    date:    formattedDate,
    status:  'pending',
    remarks: 'Waiting for review',
  });

  renderTable();

  // Reset form
  fileEl.value = '';
  document.getElementById('submitDateInput').value = '';

  // Scroll to table
  document.getElementById('submissionTable').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Init table on load
document.addEventListener('DOMContentLoaded', renderTable);