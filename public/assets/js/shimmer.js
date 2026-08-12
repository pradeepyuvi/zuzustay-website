/**
 * ZUZUStay Shimmer Loading Manager with Artificial Testing Delay
 * Controls shimmer skeleton transitions and artificial delay configuration.
 */

const ZuzuShimmer = (() => {
  'use strict';

  // =========================================================================
  // DEBUG / TESTING CONFIGURATION
  // Toggle ENABLE_ARTIFICIAL_DELAY to true for artificial testing delay.
  // Set to false for normal production load speeds.
  // =========================================================================
  const CONFIG = {
    ENABLE_ARTIFICIAL_DELAY: false, // Disabled artificial delay - normal production load speed
    ARTIFICIAL_DELAY_MS: 0,        // No artificial delay
    MIN_LOADING_TIME: 500          // Crisp minimum visual shimmer time (ms) for visual smoothness
  };

  // Check URL parameters for override (e.g. ?delay=5000 or ?delay=0)
  try {
    if (typeof window !== 'undefined' && window.location) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('delay')) {
        const delayVal = parseInt(urlParams.get('delay'), 10);
        if (!isNaN(delayVal)) {
          CONFIG.ENABLE_ARTIFICIAL_DELAY = delayVal > 0;
          CONFIG.ARTIFICIAL_DELAY_MS = delayVal;
        }
      }
    }
  } catch (e) {
    // Ignore URL parsing errors
  }

  let isInitialized = false;
  let activeTimer = null;

  const getEffectiveDelay = () => {
    return CONFIG.ENABLE_ARTIFICIAL_DELAY ? CONFIG.ARTIFICIAL_DELAY_MS : CONFIG.MIN_LOADING_TIME;
  };

  /**
   * Initializes shimmer loading state across all shimmer wrappers and images
   */
  const init = () => {
    if (isInitialized) return;
    isInitialized = true;

    const shimmerWrappers = document.querySelectorAll('.shimmer-wrapper');
    const overlayContainers = document.querySelectorAll('.shimmer-overlay-container');

    // Force initial loading state
    shimmerWrappers.forEach(wrapper => {
      wrapper.classList.add('shimmer-loading');
      wrapper.classList.remove('shimmer-ready');
    });

    overlayContainers.forEach(container => {
      container.classList.add('is-loading');
      container.classList.remove('is-loaded');
    });

    const effectiveDelay = getEffectiveDelay();

    // Render developer testing badge if artificial delay is active
    if (CONFIG.ENABLE_ARTIFICIAL_DELAY) {
      renderTestingBadge(effectiveDelay);
    }

    // Schedule smooth transition to loaded content after effective delay
    activeTimer = setTimeout(() => {
      completeLoading();
    }, effectiveDelay);
  };

  const completeLoading = () => {
    const shimmerWrappers = document.querySelectorAll('.shimmer-wrapper');
    const overlayContainers = document.querySelectorAll('.shimmer-overlay-container');

    shimmerWrappers.forEach(wrapper => {
      wrapper.classList.remove('shimmer-loading');
      wrapper.classList.add('shimmer-ready');
    });

    overlayContainers.forEach(container => {
      container.classList.remove('is-loading');
      container.classList.add('is-loaded');
    });

    const badge = document.getElementById('shimmer-testing-badge');
    if (badge) {
      badge.innerHTML = '✅ Loading Complete (7s Delay Finished)';
      setTimeout(() => {
        badge.style.opacity = '0';
        setTimeout(() => { badge.style.display = 'none'; }, 500);
      }, 2500);
    }
  };

  /**
   * Re-triggers shimmer loading state on a container or document for testing
   */
  const triggerLoading = (container = document, duration = getEffectiveDelay()) => {
    const wrappers = container.querySelectorAll ? container.querySelectorAll('.shimmer-wrapper') : [];
    wrappers.forEach(wrapper => {
      wrapper.classList.remove('shimmer-ready');
      wrapper.classList.add('shimmer-loading');
    });

    const overlays = container.querySelectorAll ? container.querySelectorAll('.shimmer-overlay-container') : [];
    overlays.forEach(overlay => {
      overlay.classList.remove('is-loaded');
      overlay.classList.add('is-loading');
    });

    setTimeout(() => {
      wrappers.forEach(wrapper => {
        wrapper.classList.remove('shimmer-loading');
        wrapper.classList.add('shimmer-ready');
      });
      overlays.forEach(overlay => {
        overlay.classList.remove('is-loading');
        overlay.classList.add('is-loaded');
      });
    }, duration);
  };

  const renderTestingBadge = (delayMs) => {
    if (document.getElementById('shimmer-testing-badge')) return;
    const badge = document.createElement('div');
    badge.id = 'shimmer-testing-badge';
    badge.className = 'shimmer-demo-badge';
    badge.innerHTML = `🧪 Artificial Shimmer Delay (${delayMs / 1000}s)`;
    badge.title = 'Artificial testing delay enabled. Click to skip delay instantly.';
    badge.addEventListener('click', () => {
      if (activeTimer) clearTimeout(activeTimer);
      completeLoading();
    });
    document.body.appendChild(badge);
  };

  const setArtificialDelay = (enabled, delayMs = 7000) => {
    CONFIG.ENABLE_ARTIFICIAL_DELAY = enabled;
    CONFIG.ARTIFICIAL_DELAY_MS = delayMs;
  };

  // Run automatically on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    init,
    triggerLoading,
    setArtificialDelay,
    CONFIG
  };
})();

// Export globally for page scripts
if (typeof window !== 'undefined') {
  window.ZuzuShimmer = ZuzuShimmer;
}
