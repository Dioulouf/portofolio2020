// **********************************      Variables     *******************************

const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

const descriptionSection = document.querySelector(".section--description")

const vynilContainer = document.querySelector(".vynil--container")
const vynil = document.querySelector(".vynil--container__vynil")
const titleMusic = document.querySelector(".section--music h2")
let FixedRatio = (sizes.height - vynil.getBoundingClientRect().height) / 2

const contactLink = document.querySelector(".link--contact")
const projectLink = document.querySelector(".link--project")

// var for background color transition
let body = document.querySelector("body")
let count = 250
var projectsSection;
var footer;
var prevRatio = 0.0;
var increasingColor = "rgba(40, 40, 190, ratio)";
var decreasingColor = "rgba(190, 40, 40, ratio)";

// ratio for music animation to have the title and img at the middle of window
vynil.style.top = `${FixedRatio}px`
titleMusic.style.top = `${(sizes.height - titleMusic.getBoundingClientRect().height) / 2}px`


// **********************************      Functions    *******************************


function parralax(element, distance, speed, translate) {
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

    observer.observe(Target);
}



// **********************************      IHM     *******************************

// event resize window
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
})

revealAnimation(".reveal", .5, 'reveal--visible')

revealAnimation(".rect-white-project-right", .2, 'animation--rect__projects--right')
revealAnimation(".rect-white-project-left", .2, 'animation--rect__projects--left')
revealAnimation(".circle-project-right", .2, 'animation--circle__projects')


window.addEventListener('scroll', function () {

    parralax('.icons-skills', window.scrollY, -0.15, false)
    parralax('.vynil--container__vynil', window.scrollY, 0.15, false)

    // description animation
    if (descriptionSection.getBoundingClientRect().top > (0 - descriptionSection.getBoundingClientRect().height)) {
        parralax('.section--description p', window.scrollY, -0.15, true);
    }

    // Vynil animation
    if (vynilContainer.getBoundingClientRect().top < 0 && vynilContainer.getBoundingClientRect().top > (0 - vynilContainer.getBoundingClientRect().height)) {
        if (sizes.width < 2200 && sizes.width > 1200) {
            titleMusic.style.transform = `translateX(${(window.scrollY - 6700) * 0.3}rem)`
        } else if (sizes.width > 2200) {
            titleMusic.style.transform = `translateX(${(window.scrollY - 7500) * 0.3}rem)`
        } else if (sizes.width <= 1200) {
            titleMusic.style.transform = `translateX(${(window.scrollY - 6000) * 0.3}rem)`
        }
    }
});


// background color transition

window.addEventListener("load", function (event) {
    projectsSection = document.querySelector(".section--projects");
    footer = document.querySelector("footer")

    createObserver(250, 0.4, 0.1, projectsSection);
    createObserver(250, 0.5, 0.5, footer);
}, false);

function buildThresholdList(numSteps, area, margin) {
    var thresholds = [];
    var calcul = area / numSteps

    for (var i = 1.0; i <= numSteps; i++) {
        var ratio = (i * calcul) + margin;
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
                count = count - 6
            }

        } else {
            // console.log(count);
            body.style.backgroundColor = `rgb(${count},${count},${count})`
            if (count < 250) {
                count = count + 6
            }
        }
        prevRatio = entry.intersectionRatio;
    });
}

// numsteps = number of ratio 
// area = interval ratios
// margin = margin behind the first ratio
// target = the element to target
function createObserver(numSteps, area, margin, target) {
    var observer;

    var options = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList(numSteps, area, margin)
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(target);
}


projectLink.addEventListener("click", () => {
    body.style.backgroundColor = "rgb(0,0,0)"
    console.log("projet click");
})

contactLink.addEventListener("click", () => {
    body.style.backgroundColor = "rgb(0,0,0)"
    console.log("contact click");
})





window.onload = function () {
    setTimeout(function () {
        body.classList.add('loaded');
    }, 2000);
}