function showModule(id) {
  document.querySelectorAll('.module').forEach(m => {
    m.classList.remove('active-module');
  });

  document.getElementById(id).classList.add('active-module');
}