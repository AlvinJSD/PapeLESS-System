// ─── LOGOUT ────────────────────────────────────────────────────────────────────
function logout() {
  window.location.href = "index.html";
}


// ─── MODULE SWITCHER ───────────────────────────────────────────────────────────
function showModule(moduleId) {
  document.querySelectorAll('.module').forEach(m => m.classList.remove('active-module'));
  const active = document.getElementById(moduleId);
  if (active) active.classList.add('active-module');
}


// ─── USERS: ADD USER FORM TOGGLE ───────────────────────────────────────────────
function showAddUserForm() {
  document.getElementById('addUserForm').style.display = 'block';
}

function hideAddUserForm() {
  document.getElementById('addUserForm').style.display = 'none';
  document.getElementById('newUserName').value  = '';
  document.getElementById('newUserEmail').value = '';
}

function addUser() {
  const name  = document.getElementById('newUserName').value.trim();
  const email = document.getElementById('newUserEmail').value.trim();
  const role  = document.getElementById('newUserRole').value;

  if (!name)  { alert('Please enter a name.'); return; }
  if (!email) { alert('Please enter an email.'); return; }

  const tbody = document.getElementById('userBody');
  const rowCount = tbody.querySelectorAll('tr').length + 1;

  const roleBadgeClass = role === 'Student' ? 'student' : 'adviser';

  const newRow = document.createElement('tr');
  newRow.dataset.role   = role;
  newRow.dataset.status = 'Active';
  newRow.innerHTML = `
    <td>${rowCount}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td><span class="role-badge ${roleBadgeClass}">${role}</span></td>
    <td><span class="status approved">Active</span></td>
    <td><button class="btn-deactivate" onclick="toggleStatus(this)">Deactivate</button></td>
  `;

  tbody.appendChild(newRow);
  updateUserCount();
  hideAddUserForm();
}


// ─── USERS: TOGGLE ACTIVE / INACTIVE ──────────────────────────────────────────
function toggleStatus(btn) {
  const row        = btn.closest('tr');
  const statusCell = row.querySelector('.status');
  const isActive   = row.dataset.status === 'Active';

  if (isActive) {
    row.dataset.status       = 'Inactive';
    statusCell.textContent   = 'Inactive';
    statusCell.className     = 'status rejected';
    btn.textContent          = 'Activate';
    btn.className            = 'btn-activate';
    btn.onclick              = () => toggleStatus(btn);
  } else {
    row.dataset.status       = 'Active';
    statusCell.textContent   = 'Active';
    statusCell.className     = 'status approved';
    btn.textContent          = 'Deactivate';
    btn.className            = 'btn-deactivate';
    btn.onclick              = () => toggleStatus(btn);
  }
}


// ─── USERS: FILTER ─────────────────────────────────────────────────────────────
function filterUsers() {
  const search = document.getElementById('userSearch').value.toLowerCase();
  const role   = document.getElementById('roleFilter').value.toLowerCase();
  const status = document.getElementById('userStatusFilter').value.toLowerCase();

  const rows = document.querySelectorAll('#userBody tr');
  let visible = 0;

  rows.forEach(row => {
    const name       = row.cells[1]?.textContent.toLowerCase() || '';
    const email      = row.cells[2]?.textContent.toLowerCase() || '';
    const rowRole    = (row.dataset.role   || '').toLowerCase();
    const rowStatus  = (row.dataset.status || '').toLowerCase();

    const searchMatch = !search || name.includes(search) || email.includes(search);
    const roleMatch   = !role   || rowRole === role;
    const statusMatch = !status || rowStatus === status;

    const show = searchMatch && roleMatch && statusMatch;
    row.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  updateUserCount(visible);
}

function updateUserCount(n) {
  const count = n !== undefined ? n : document.querySelectorAll('#userBody tr').length;
  document.getElementById('userCount').textContent =
    count + ' user' + (count !== 1 ? 's' : '');
}


// ─── SUBMISSIONS: FILTER ───────────────────────────────────────────────────────
function filterSubmissions() {
  const type    = document.getElementById('subTypeFilter').value.toLowerCase();
  const status  = document.getElementById('subStatusFilter').value.toLowerCase();
  const adviser = document.getElementById('adviserFilter').value.toLowerCase();

  const rows = document.querySelectorAll('#subBody tr');
  let visible = 0;

  rows.forEach(row => {
    const rowType    = (row.dataset.type    || '').toLowerCase();
    const rowStatus  = (row.dataset.status  || '').toLowerCase();
    const rowAdviser = (row.dataset.adviser || '').toLowerCase();

    const typeMatch    = !type    || rowType.includes(type);
    const statusMatch  = !status  || rowStatus === status;
    const adviserMatch = !adviser || rowAdviser.includes(adviser);

    const show = typeMatch && statusMatch && adviserMatch;
    row.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  document.getElementById('subCount').textContent =
    visible + ' submission' + (visible !== 1 ? 's' : '');
}


// ─── ANNOUNCEMENTS: POST ───────────────────────────────────────────────────────
function postAnnouncement() {
  const title    = document.getElementById('announcementTitle').value.trim();
  const body     = document.getElementById('announcementBody').value.trim();
  const target   = document.getElementById('announcementTarget').value;
  const priority = document.getElementById('announcementPriority').value;

  if (!title) { alert('Please enter a title.'); return; }
  if (!body)  { alert('Please enter a message.'); return; }

  const today = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const priorityLabel = priority === 'urgent'
    ? `<span class="role-badge ms-2" style="background:#f8d7da;color:#721c24;">Urgent</span>`
    : `<span class="role-badge ms-2" style="background:#d4edda;color:#155724;">Normal</span>`;

  const targetBadge = target === 'Students Only'
    ? `<span class="role-badge ms-1 student">Students Only</span>`
    : target === 'Advisers Only'
    ? `<span class="role-badge ms-1 adviser">Advisers Only</span>`
    : `<span class="role-badge ms-1 student">All Users</span>`;

  const card = document.createElement('div');
  card.className = `announcement-card ${priority} mt-2`;
  card.innerHTML = `
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <strong>${title}</strong>
        ${priorityLabel}
        ${targetBadge}
      </div>
      <small class="text-muted">${today}</small>
    </div>
    <p class="mt-2 mb-1 text-muted small">${body}</p>
    <button class="btn-delete-sm" onclick="deleteAnnouncement(this)">🗑 Delete</button>
  `;

  document.getElementById('announcementList').prepend(card);
  updateAnnouncementCount();

  // Reset form
  document.getElementById('announcementTitle').value = '';
  document.getElementById('announcementBody').value  = '';
}

function deleteAnnouncement(btn) {
  btn.closest('.announcement-card').remove();
  updateAnnouncementCount();
}

function updateAnnouncementCount() {
  const count = document.querySelectorAll('#announcementList .announcement-card').length;
  document.getElementById('announcementCount').textContent =
    count + ' announcement' + (count !== 1 ? 's' : '');
}


// ─── INIT ───────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateUserCount();
  updateAnnouncementCount();
});