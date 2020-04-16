// **********************************      Variables     *******************************

const sizes = {}
sizes.width = document.documentElement.clientWidth
sizes.height = document.documentElement.clientHeight

const descriptionSection = document.querySelector(".section--description")

const vynilContainer = document.querySelector(".vynil--container")
const vynil = document.querySelector(".vynil--container__vynil")
const titleMusic = document.querySelector(".section--music h2")
let FixedRatio = (sizes.height - vynil.getBoundingClientRect().height) / 2

const traineeshipContainer = document.querySelector(".description__container")
var traineeshipTexte = document.querySelector(".traineeship")

let body = document.querySelector("body")

// var for background color transition
let count = 250
var projectsSection;
var footer;
var prevRatio = 0.0;
var increasingColor = "rgba(40, 40, 190, ratio)";
var decreasingColor = "rgba(190, 40, 40, ratio)";

// ratio for music animation to have the title and img at the middle of window
if (sizes.width > 900) {
    vynil.style.top = `${FixedRatio}px`
    titleMusic.style.top = `${(sizes.height - titleMusic.getBoundingClientRect().height) / 2}px`
}



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

revealAnimation(".reveal", .3, 'reveal--visible')

revealAnimation(".rect-white-project-right", .2, 'animation--rect__projects--right')
revealAnimation(".rect-white-project-left", .2, 'animation--rect__projects--left')
revealAnimation(".circle-project-right", .2, 'animation--circle__projects')
revealAnimation(".rect-white-footer-right ", .2, 'animation--rect__footer')


window.addEventListener('scroll', function () {

    parralax('.icons-skills', window.scrollY, -0.15, false)
    parralax('.vynil--container__vynil', window.scrollY, 0.15, false)
    if (sizes.width > 900) {
        if (traineeshipContainer.getBoundingClientRect().top - sizes.height < 0 && traineeshipContainer.getBoundingClientRect().top - sizes.height + traineeshipContainer.getBoundingClientRect().height > 0 - sizes.height) {
            traineeshipTexte.style.transform = `translateX(${(traineeshipContainer.getBoundingClientRect().top - sizes.height) + 600}px)`
        }
    }

    // Vynil animation

    if (sizes.width > 900) {
        if (vynilContainer.getBoundingClientRect().top < 0 && vynilContainer.getBoundingClientRect().top > (0 - vynilContainer.getBoundingClientRect().height)) {
            if (sizes.width < 2200 && sizes.width > 1200) {
                titleMusic.style.transform = `translateX(${(window.scrollY - 6700) * 0.3}rem)`
            } else if (sizes.width > 2200) {
                titleMusic.style.transform = `translateX(${(window.scrollY - 7500) * 0.3}rem)`
            } else if (sizes.width <= 1200) {
                titleMusic.style.transform = `translateX(${(window.scrollY - 6000) * 0.3}rem)`
            }
        }
    }

});






// background color transition

// window.addEventListener("load", function (event) {
//     projectsSection = document.querySelector(".section--projects");
//     footer = document.querySelector("footer")

//     if (sizes.width > 900) {
//         createObserver(250, 0.4, 0.1, projectsSection);
//         createObserver(250, 0.5, 0.3, footer);
//     }

// }, false);

// function buildThresholdList(numSteps, area, margin) {
//     var thresholds = [];
//     var calcul = area / numSteps

//     for (var i = 1.0; i <= numSteps; i++) {
//         var ratio = (i * calcul) + margin;
//         thresholds.push(ratio);
//     }

//     thresholds.push(0);
//     return thresholds;
// }

// function handleIntersect(entries, observer) {
//     entries.forEach(function (entry) {
//         if (entry.intersectionRatio > prevRatio) {
//             body.style.backgroundColor = `rgb(${count},${count},${count})`
//             if (count > 0) {
//                 count = count - 6
//             }

//         } else {
//             body.style.backgroundColor = `rgb(${count},${count},${count})`
//             if (count < 250) {
//                 count = count + 6
//             }
//         }
//         prevRatio = entry.intersectionRatio;
//     });
// }














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











// loader animation

window.onload = function () {
    body.style.overflow = "hidden"






    //     // if (navigator.browserLanguage) {
    //     //     var language = navigator.browserLanguage;
    //     // } else {
    //     //     var language = navigator.language;
    //     // }
    //     // if (language.indexOf('fr') > -1) {
    //     //     document.location.href = 'file:///Users/diouloufet/Desktop/portofolio2020/index-fr.html';
    //     // } else if (language.indexOf('en') > -1) {
    //     //     document.location.href = 'index-en.html'
    //     // }
    //     // console.log(document.location);




    setTimeout(function () {
        body.classList.add('loaded');
        window.scrollTo(0, 0);
        body.style.overflowX = "hidden"
        body.style.overflowY = ""
    }, 2000);
}