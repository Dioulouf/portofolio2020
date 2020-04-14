// **********************************      Variables     *******************************

const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

let vynilContainer = document.querySelector(".vynil--container")
let vynil = document.querySelector(".vynil--container__vynil")
let titleMusic = document.querySelector(".section--music h2")
let FixedRatio = (sizes.height - vynil.getBoundingClientRect().height) / 2

// ratio for music animation to have the title and img at the middle of window
vynil.style.top = `${FixedRatio}px`
titleMusic.style.top = `${(sizes.height - titleMusic.getBoundingClientRect().height) / 2}px`



// **********************************      Functions    *******************************


function parralax(element, distance, speed) {
    const item = document.querySelector(element);
    const ratio = distance * speed;
    item.style.transform = "translateY(" + ratio + "px)";
}


function parralax2(element, distance, speed, translate) {
    if (translate == true) {
        const item = document.querySelector(element);
        const ratio = distance * speed;
        item.style.transform = "translateY(" + ratio + "px)";
    } else {
        const item = document.querySelector(element);
        const ratio = distance * speed;
        item.style.transform = "rotate(" + ratio + "deg)";
    }
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

    // document.querySelectorAll('[class*="reveal-"]').forEach(function (r) {
    //     observer.observe(r);
    // })

    observer.observe(Target);
}



// **********************************      IHM     *******************************



// event resize window
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
})

revealAnimation(".reveal", .5, 'reveal-visible')


window.addEventListener('scroll', function () {
    parralax('.section--description p', window.scrollY, -0.15);
    parralax2('.icons-skills', window.scrollY, -0.15, false)
    parralax2('.vynil--container__vynil', window.scrollY, 0.15, false)






    if (vynilContainer.getBoundingClientRect().top < 0 && vynilContainer.getBoundingClientRect().top > (0 - vynilContainer.getBoundingClientRect().height)) {
        if (sizes.width < 2200) {
            titleMusic.style.transform = `translateX(${(window.scrollY - 6700) * 0.3}rem)`
        } else {
            titleMusic.style.transform = `translateX(${(window.scrollY - 7500) * 0.3}rem)`
        }

    }



});





































// background transition to black or whrite

let body = document.querySelector("body")
var numSteps = 250.0;
let count = 250
var boxElement;
var prevRatio = 0.0;
var increasingColor = "rgba(40, 40, 190, ratio)";
var decreasingColor = "rgba(190, 40, 40, ratio)";


window.addEventListener("load", function (event) {
    boxElement = document.querySelector(".section--projects");

    createObserver();
}, false);



function buildThresholdList() {
    var thresholds = [];

    for (var i = 1.0; i <= numSteps; i++) {
        var ratio = i * 0.0016;
        thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
}

function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio > prevRatio) {
            // console.log(count);
            body.style.backgroundColor = `rgb(${count},${count},${count})`
            if (count > 0) {
                count = count - 4
            }

        } else {
            // console.log(count);
            body.style.backgroundColor = `rgb(${count},${count},${count})`
            if (count < 250) {
                count = count + 3
            }
        }
        prevRatio = entry.intersectionRatio;
    });
}

function createObserver() {
    var observer;

    var options = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(boxElement);
}