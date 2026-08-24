/* Reveals sections as they scroll into view. The hidden state is applied only
   while data-reveal="ready" is set, so the page is fully readable without JS. */
(function () {
  'use strict'

  window.__revealInit = true

  var targets = document.querySelectorAll('.reveal, .window')
  if (!targets.length) return

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function showAll() {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-in')
  }

  if (reduced || !('IntersectionObserver' in window)) {
    showAll()
    return
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
  )

  for (var i = 0; i < targets.length; i++) observer.observe(targets[i])
})()
