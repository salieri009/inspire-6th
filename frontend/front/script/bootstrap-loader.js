// Bootstrap loader (via CDN)
// Adds Bootstrap JS and Popper (required) to the page dynamically.
(function() {
  function loadScript(src, callback, onerror) {
    var s = document.createElement('script');
    s.src = src;
    s.defer = true;
    s.onload = function() { if (callback) callback(); };
    s.onerror = function() { if (onerror) onerror(); };
    document.head.appendChild(s);
  }

  function loadCSS(href, onerror) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    l.onerror = function() { if (onerror) onerror(); };
    document.head.appendChild(l);
    return l;
  }

  var localCSS = '../css/bootstrap.min.css';
  var cdnCSS = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

  // Try local CSS first, fallback to CDN on error
  loadCSS(localCSS, function() { loadCSS(cdnCSS); });

  var localPopper = '../script/popper.min.js';
  var localBootstrap = '../script/bootstrap.min.js';
  var cdnPopper = 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js';
  var cdnBootstrap = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js';

  // Load Popper then Bootstrap, preferring local files and falling back to CDN
  loadScript(localPopper, function() {
    loadScript(localBootstrap, null, function() { loadScript(cdnBootstrap); });
  }, function() {
    // local Popper failed — use CDN Popper then CDN Bootstrap
    loadScript(cdnPopper, function() { loadScript(cdnBootstrap); });
  });
})();
