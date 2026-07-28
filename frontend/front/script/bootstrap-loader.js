// Bootstrap loader (via CDN)
// Adds Bootstrap JS and Popper (required) to the page dynamically.
(function() {
  function loadScript(src, callback) {
    var s = document.createElement('script');
    s.src = src;
    s.defer = true;
    s.onload = callback;
    document.head.appendChild(s);
  }

  // Load Popper first (Bootstrap 4/5 needs it for dropdowns/tooltips)
  loadScript('https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js', function() {
    loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js');
  });
})();
