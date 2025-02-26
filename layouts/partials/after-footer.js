<!-- LazySizes -->
<script src="https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js" integrity="sha384-..." crossorigin="anonymous"></script>

<!-- Clipboard.js -->
<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js" integrity="sha384-..." crossorigin="anonymous"></script>

<!-- Custom Script -->
<script src="/js/script.js"></script>

<!-- AOS (Animate On Scroll) -->
<script src="/js/aos.js"></script>
<script>
  var aosInit = () => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      offset: 50,
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aosInit);
  } else {
    aosInit();
  }
</script>

<!-- Pjax Script -->
<script src="/js/pjax_script.js" data-pjax></script>

<!-- Generator Search -->
<script src="/js/generator_search.js" defer></script>

<!-- Algolia Search -->
<script>
  var ALGOLIA_CONFIG = {
    logo: "/images/algolia_logo.svg",
    algolia: {
      applicationID: "YOUR_APP_ID",
      apiKey: "YOUR_API_KEY",
      indexName: "YOUR_INDEX_NAME",
      hits: {
        "per_page": 10
      },
      labels: {
        "input_placeholder": "Search for Posts",
        "hits_empty": "We didn't find any results for the search: ${query}",
        "hits_stats": "${hits} results found in ${time} ms"
      }
    }
  };
</script>
<script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.10.3/dist/algoliasearch-lite.umd.js" integrity="sha384-..." crossorigin="anonymous" defer></script>
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js" integrity="sha384-..." crossorigin="anonymous" defer></script>
<script src="/js/algolia_search.js" defer></script>

<!-- Firework -->
<script src="https://cdn.jsdelivr.net/npm/firework@1.0.0/firework.min.js" integrity="sha384-..." crossorigin="anonymous"></script>
<script>
  window.firework && window.firework({});
</script>

<!-- Pjax -->
<script src="https://cdn.jsdelivr.net/npm/pjax@0.2.8/pjax.min.js" integrity="sha384-..." crossorigin="anonymous"></script>
<script>
  function loadScripts(scripts, index) {
    if (index < scripts.length) {
      const script = scripts[index];
      const src = script.getAttribute('src');
      const loadScript = (scriptContent) => {
        return new Promise((resolve, reject) => {
          const scriptElement = document.createElement('script');
          if (script.type) scriptElement.type = script.type;
          if (script.src) {
            scriptElement.src = script.src;
            scriptElement.onload = resolve;
            scriptElement.onerror = reject;
          }
          if (scriptContent) scriptElement.text = scriptContent;
          document.head.appendChild(scriptElement);
          if (!script.src) resolve();
        });
      };
      (src ? loadScript() : loadScript(script.text))
        .then(() => loadScripts(scripts, index + 1))
        .catch(error => {
          console.error(`Failed to load script: ${src || 'inline script'}`, error);
          loadScripts(scripts, index + 1);
        });
    }
  }
  if (window.Pjax) {
    Pjax.prototype.getElements = function() {
      const i18nLanguages = window.REIMU_CONFIG.i18n_languages;
      const baseUrl = window.REIMU_CONFIG.base;
      let basePathname = new URL(baseUrl).pathname;
      if (!basePathname.endsWith('/')) basePathname += '/';
      const currentUrl = window.location.href;
      const currentPathname = new URL(currentUrl).pathname.replace(basePathname, '');
      const aLinks = document.querySelectorAll('a[href]');
      const pjaxLinks = [];
      for (let i = 0; i < aLinks.length; i++) {
        const aLink = aLinks[i];
        const aLinkHref = aLink.getAttribute('href');
        const isExternal = aLink.getAttribute('target') === '_blank' || aLink.getAttribute('rel')?.includes('noopener');
        if (isExternal || aLinkHref.startsWith('mailto:') || aLinkHref.startsWith('tel:') || aLinkHref.startsWith('javascript:') || aLinkHref.startsWith("data:") || aLinkHref.startsWith("vbscript:")) {
          continue;
        }
        if (!i18nLanguages) {
          pjaxLinks.push(aLink);
          continue;
        }
        const absoluteUrl = new URL(aLinkHref, currentUrl).href;
        const absolutePathname = new URL(absoluteUrl).pathname.replace(basePathname, '');
        const currentLangIndex = i18nLanguages.findIndex(lang => currentPathname.startsWith(lang));
        if (currentLangIndex > -1) {
          const absoluteLangIndex = i18nLanguages.findIndex(lang => absolutePathname.startsWith(lang));
          if (absoluteLangIndex === currentLangIndex) pjaxLinks.push(aLink);
        } else {
          const absoluteLangIndex = i18nLanguages.findIndex(lang => absolutePathname.startsWith(lang));
          if (absoluteLangIndex === -1) pjaxLinks.push(aLink);
        }
      }
      return pjaxLinks;
    };
    new window.Pjax({
      selectors: [
        "#header>img",
        "#header>picture",
        "head title",
        "#header-title",
        "#subtitle-wrap",
        "#main",
        "#content",
        ".sidebar-widget",
        ".sidebar-wrapper",
        '#mobile-nav',
        '#lazy-script',
        '#i18n-nav'
      ],
      switches: {
        "#content": function(oldEl, newEl) {
          oldEl.className = newEl.className;
          this.onSwitch();
        },
        "#header-title": Pjax.switches.outerHTML,
        "#subtitle-wrap": Pjax.switches.outerHTML,
        "#main": function(oldEl, newEl) {
          const scripts = [...newEl.querySelectorAll('script')];
          loadScripts(scripts, 0);
          oldEl.outerHTML = newEl.outerHTML;
          this.onSwitch();
        },
        "#mobile-nav": Pjax.switches.outerHTML,
        '#lazy-script': function(oldEl, newEl) {
          const scripts = [...newEl.querySelectorAll('script')];
          loadScripts(scripts, 0);
          oldEl.innerHTML = newEl.innerHTML;
          this.onSwitch();
        }
      },
      cacheBust: false
    });
  }
</script>
<script src="/js/pjax.js"></script>

<!-- Live2D -->
<script>
  function initLive2d() {
    live2d.init("https://cdn.jsdelivr.net/npm/live2d-widget@3.0.0/lib/live2d.min.js", { themeTipsPath: "" });
  }
</script>
<script src="https://cdn.jsdelivr.net/npm/live2d-widget@3.0.0/lib/live2d.min.js" onload="initLive2d && initLive2d()" async></script>

<!-- Live2D Widgets -->
<script src="https://cdn.jsdelivr.net/npm/live2d-widget@3.0.0/lib/live2d.min.js" integrity="sha384-..." crossorigin="anonymous"></script>

<!-- Quicklink -->
<script src="https://cdn.jsdelivr.net/npm/quicklink@2.2.0/dist/quicklink.umd.js" integrity="sha384-..." crossorigin="anonymous"></script>
<script data-pjax>
  window.quicklink?.listen({
    timeout: 3000,
    priority: true,
    ignores: []
  });
</script>

<!-- Lazy Script Section -->
<div id="lazy-script">
  <div>
    <!-- Post-specific scripts -->
    <script data-pjax>
      window.REIMU_POST = {
        author: "Author Name",
        title: "Post Title",
        url: "https://example.com/post-url",
        excerpt: "Post excerpt",
        description: "Post description",
        stripContent: "Stripped content",
        date: "2023-01-01",
        updated: "2023-01-01",
        cover: "/images/cover.jpg",
      };
    </script>

    <!-- Mermaid -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid@8.13.3/dist/mermaid.min.js" integrity="sha384-..." crossorigin="anonymous" data-pjax></script>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@2.3.3/dist/purify.min.js" integrity="sha384-..." crossorigin="anonymous"></script>
    <script data-pjax>
      if (window.mermaid) {
        const elementCode = '.mermaid';
        const saveOriginalData = () => {
          return new Promise((resolve, reject) => {
            try {
              let els = document.querySelectorAll(elementCode),
                  count = els.length;
              els.forEach(element => {
                if (element.getAttribute('data-original-code') == null) {
                  element.setAttribute('data-original-code', element.innerHTML);
                }
                count--;
                if (count == 0) resolve();
              });
            } catch (error) {
              reject(error);
            }
          });
        };
        const resetProcessed = () => {
          return new Promise((resolve, reject) => {
            try {
              let els = document.querySelectorAll(elementCode),
                  count = els.length;
              els.forEach(element => {
                if (element.getAttribute('data-original-code') != null) {
                  element.removeAttribute('data-processed');
                  element.innerHTML = DOMPurify.sanitize(element.getAttribute('data-original-code'));
                }
                count--;
                if (count == 0) resolve();
              });
            } catch (error) {
              reject(error);
            }
          });
        };
        const loadMermaid = (theme) => {
          window.mermaid.initialize({ theme });
          window.mermaid.init({ theme }, document.querySelectorAll(elementCode));
        };
        document.body.addEventListener('dark-theme-set', () => {
          saveOriginalData().then(() => resetProcessed()).then(() => loadMermaid('dark')).catch(console.error);
        });
        document.body.addEventListener('light-theme-set', () => {
          saveOriginalData().then(() => resetProcessed()).then(() => loadMermaid('default')).catch(console.error);
        });
        if (localStorage.getItem('dark_mode') == 'true') {
          saveOriginalData().then(() => resetProcessed()).then(() => loadMermaid('dark')).catch(console.error);
        } else {
          saveOriginalData().then(() => resetProcessed()).then(() => loadMermaid('default')).catch(console.error);
        }
      }
    </script>

    <!-- Highlight.js -->
    <script src="/js/insert_highlight.js" data-pjax></script>
    <script src="https://cdn.jsdelivr.net/npm/html2image@1.0.0/dist/html2image.min.js" integrity="sha384-..." crossorigin="anonymous" defer data-pjax></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js" integrity="sha384-..." crossorigin="anonymous" defer data-pjax></script>

    <!-- PhotoSwipe -->
    <script type="module" data-pjax>
      import PhotoSwipeLightbox from 'https://cdn.jsdelivr.net/npm/photoswipe@5.2.2/dist/photoswipe-lightbox.esm.min.js';
      const pswp = () => {
        if (document.querySelectorAll('.article-entry a.article-gallery-item').length > 0) {
          new PhotoSwipeLightbox({
            gallery: '.article-entry',
            children: 'a.article-gallery-item',
            pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.2.2/dist/photoswipe.esm.min.js')
          }).init();
        }
        if (document.querySelectorAll('.article-gallery a.article-gallery-item').length > 0) {
          new PhotoSwipeLightbox({
            gallery: '.article-gallery',
            children: 'a.article-gallery-item',
            pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.2.2/dist/photoswipe.esm.min.js')
          }).init();
        }
        window.lightboxStatus = 'done';
        window.removeEventListener('lightbox:ready', pswp);
      };
      if (window.lightboxStatus === 'ready') {
        pswp();
      } else {
        window.addEventListener('lightbox:ready', pswp);
      }
    </script>

    <!-- Comments -->
    <!-- Include your comment system script here -->
  </div>
</div>

<!-- Busuanzi -->
<script src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js" integrity="sha384-..." crossorigin="anonymous" async></script>

<!-- Service Worker -->
<script src="/js/service_worker.js"></script>

<!-- KaTeX -->
<script src="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.js" integrity="sha384-..." crossorigin="anonymous" defer data-pjax></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/contrib/auto-render.min.js" integrity="sha384-..." crossorigin="anonymous" defer onload="renderMathInElement(document.querySelector('article'), {delimiters: [{left: '$$', right: '$$', display: true},{left: '$', right: '$', display: false}]});" data-pjax></script>

<!-- APlayer -->
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js" integrity="sha384-..." crossorigin="anonymous"></script>
<script>
  const ap = new APlayer({
    theme: "var(--color-link)",
    container: document.getElementById('aplayer'),
    audio: [],
    fixed: false,
    autoplay: false,
    loop: 'all',
    order: 'list',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    lrcType: 0,
  });
</script>

<!-- Meting -->
<script src="https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js" integrity="sha384-..." crossorigin="anonymous"></script>
<script>
  var meting_api = "https://api.example.com/meting";
</script>