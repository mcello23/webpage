/**
 * Path Helper
 * Fixes anchor tags for paths when deployed on /webpage/ sub-path (GitHub Pages)
 */
(function () {
  try {
    var path = window.location && window.location.pathname ? window.location.pathname : '';
    var base = path.indexOf('/webpage/') === 0 ? '/webpage' : '';
    if (!base) return;
    var anchors = document.querySelectorAll('a[href^="/"]');
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i];
      var href = a.getAttribute('href');
      if (!href) continue;
      if (href === '/') {
        a.setAttribute('href', base + '/');
      } else if (href.indexOf('/pages/') === 0) {
        a.setAttribute('href', base + href);
      }
    }
  } catch {
    // no-op
  }
})();
