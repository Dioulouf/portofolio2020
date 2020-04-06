// **********************************      Variables     *******************************


// **********************************      Functions    *******************************


function parralax(element, distance, speed) {
    const item = document.querySelector(element);
    const ratio = distance * speed;
    item.style.transform = "translateY(" + ratio + "px)";
}





function revealAnimation(target, ratio, classAdd) {
    let Target = document.querySelector(target);
    var options = {
        root: null,
        rootMargin: '0px',
        threshold: ratio
    };

    function handleIntersect(entries, observer) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > ratio) {
                entry.target.classList.add(classAdd)
                observer.unobserve(entry.target)
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersect, options);

    document.querySelectorAll('[class*="reveal-"]').forEach(function (r) {
        observer.observe(r);
    })

    observer.observe(Target);
}



// **********************************      IHM     *******************************


revealAnimation(".reveal", .5, 'reveal-visible')

window.addEventListener('scroll', function () {
    parralax('.section--description p', window.scrollY, -0.25 r);
});