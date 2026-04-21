// ─── MODULE SWITCHER ───────────────────────────────────────────────────────────
function showModule(moduleId) {
  document.querySelectorAll('.module').forEach(m => m.classList.remove('active-module'));
  const active = document.getElementById(moduleId);
  if (active) active.classList.add('active-module');
}


// ─── REVIEW: APPROVE / REJECT ──────────────────────────────────────────────────
function updateStatus(btn, newStatus) {
  const row = btn.closest('tr');
  const statusCell = row.querySelector('.status');

  const labelMap = { approved: 'Approved', rejected: 'Revision' };
  const classMap = { approved: 'approved', rejected: 'rejected' };

  // Update badge
  statusCell.textContent = labelMap[newStatus];
  statusCell.className = 'status ' + classMap[newStatus];

  // Update row data attribute for filtering
  row.dataset.status = newStatus;

  // Disable both buttons after action
  row.querySelectorAll('.btn-approve, .btn-reject').forEach(b => {
    b.disabled = true;
    b.style.opacity = '0.5';
    b.style.cursor = 'default';
  });

  updateReviewCount();
}

function updateReviewCount() {
  const rows = document.querySelectorAll('#reviewBody tr');
  document.getElementById('reviewCount').textContent =
    rows.length + ' submission' + (rows.length !== 1 ? 's' : '');
}


// ─── REVIEW: FILTER ────────────────────────────────────────────────────────────
function filterTable() {
  const type   = document.getElementById('filterType').value.toLowerCase();
  const status = document.getElementById('filterStatus').value.toLowerCase();

  document.querySelectorAll('#reviewBody tr').forEach(row => {
    const rowType   = (row.dataset.type   || '').toLowerCase();
    const rowStatus = (row.dataset.status || '').toLowerCase();

    const typeMatch   = !type   || rowType.includes(type);
    const statusMatch = !status || rowStatus === status;

    row.style.display = (typeMatch && statusMatch) ? '' : 'none';
  });
}


// ─── STUDENTS: FILTER ──────────────────────────────────────────────────────────
function filterStudents() {
  const search = document.getElementById('studentSearch').value.toLowerCase();
  const course = document.getElementById('courseFilter').value.toLowerCase();
  const status = document.getElementById('statusFilter').value.toLowerCase();

  const rows = document.querySelectorAll('#studentBody tr');
  let visible = 0;

  rows.forEach(row => {
    const name       = row.cells[1]?.textContent.toLowerCase() || '';
    const studentNo  = row.cells[2]?.textContent.toLowerCase() || '';
    const rowCourse  = (row.dataset.course || '').toLowerCase();
    const rowStatus  = (row.dataset.status || '').toLowerCase();

    const searchMatch = !search || name.includes(search) || studentNo.includes(search);
    const courseMatch = !course || rowCourse === course;
    const statusMatch = !status || rowStatus === status;

    const show = searchMatch && courseMatch && statusMatch;
    row.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  document.getElementById('studentCount').textContent =
    visible + ' student' + (visible !== 1 ? 's' : '');
}


// ─── INIT ───────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateReviewCount();
});