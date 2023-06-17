function hideYouTubeShorts() {
    const shortsSelector = "ytd-rich-item-renderer.style-scope.ytd-rich-grid-row";
    const shortsOverlaySelector = "div#overlays ytd-thumbnail-overlay-time-status-renderer[overlay-style='SHORTS']";

    const hideShorts = (element) => {
        const videoItem = element.closest(shortsSelector);
        if (videoItem) {
            videoItem.style.display = "none";
        }
    };

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.matches && node.matches(shortsOverlaySelector)) {
                        hideShorts(node);
                    } else if (node.querySelectorAll) {
                        const shortsElements = node.querySelectorAll(shortsOverlaySelector);
                        shortsElements.forEach(hideShorts);
                    }
                });
            }
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
}

hideYouTubeShorts();
