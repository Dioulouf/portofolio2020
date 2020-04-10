// **********************************      Variables     *******************************


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
        item.style.transform = "translateY(-50%) rotate(" + ratio + "deg)";
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


revealAnimation(".reveal", .5, 'reveal-visible')

window.addEventListener('scroll', function () {
    parralax('.section--description p', window.scrollY, -0.15);
    parralax2('.icons-skills', window.scrollY, -0.15, false)
    parralax2('.music__vynil', window.scrollY, 0.15, false)


    // parralax('.article--analytics', window.scrollY, -0.05);
    // parralax('.article--integration', window.scrollY, -0.05);
    // parralax('.article--jeux', window.scrollY, -0.05);
    // parralax('.article--prototype', window.scrollY, -0.05);
});





















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
            console.log(count);
            body.style.backgroundColor = `rgb(${count},${count},${count})`
            if (count > 0) {
                count = count - 4
            }

        } else {
            console.log(count);
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