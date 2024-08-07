export function startLoop(element, init, clear, nextFrame, { resetOnScroll = false, resetOnClick = false, alwaysRun = false, resetOnResize = true, fps = 60} = {}) {
    init();
    nextFrame()

    const interval = fps ? (1000 / fps) : 0;
    let lastTime = performance.now();
    
    function loop() {

        const currentTime = performance.now();

        if (currentTime - lastTime >= interval && (alwaysRun || isInViewport(element))) {
            clear();
            nextFrame();
            lastTime = currentTime;
        }
                
        requestAnimationFrame(loop);
    }

    loop();

    function reset() {
        clear();
        init();
    }

    if (resetOnClick) element.addEventListener("click", reset)
    if (resetOnScroll) respondToVisibility(element, reset)
    if (resetOnResize) window.addEventListener("resize", reset);
}

function respondToVisibility(element, callback, { thresholdRatio = 0 } = {}) {
    const options = {
        root: document.documentElement,
        rootMargin: "0px",
        threshold: thresholdRatio,
    };

    const intersectionCallback = (entries, observer) => {
        entries.forEach((entry) => {
            callback({entry, observer})
        });
    };

    const observer = new IntersectionObserver(intersectionCallback, options);

    observer.observe(element);
}

function isInViewport(element, {outOfViewPortRatio = 1} = {}) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top + (rect.height * outOfViewPortRatio) >= 0 &&
        rect.bottom - (rect.height * outOfViewPortRatio) <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

export function updateCanvasSizes(canvas) {

    function updateCanvasSizeWithDpr() {
        const dpr = Math.ceil(window.devicePixelRatio || 1);
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
    }

    window.addEventListener("resize", updateCanvasSizeWithDpr);
    updateCanvasSizeWithDpr()
}

export function setHashAutoFocus(element, hash, {refreshRate = 100, offScreenRatio = 0} = {}) {
    hash = hash ?? ("#" + element.parentElement.id)

    setInterval(() => {
        if (window.location.hash != hash && isInViewport(element, {outOfViewPortRatio: offScreenRatio})) {
            window.history.replaceState( {} , document.title, window.location.origin + window.location.pathname + hash);
        }
    }, refreshRate)
}