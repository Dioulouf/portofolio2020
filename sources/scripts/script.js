// **********************************      variables     *******************************

const sizes = {}
sizes.width = document.documentElement.clientWidth
sizes.height = document.documentElement.clientHeight

const descriptionSection = document.querySelector(".section--description")
const vynilContainer = document.querySelector(".vynil--container")
const vynil = document.querySelector(".vynil--container__vynil")
const titleMusic = document.querySelector(".section--music h2")
let FixedRatio = (sizes.height - vynil.getBoundingClientRect().height) / 2
const traineeshipContainer = document.querySelector(".description__container")
const traineeshipTexte = document.querySelector(".traineeship")
const body = document.querySelector("body")

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
    let options = {
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

revealAnimation(".rect-white-project-right", .2, 'animation--rect__projects--right')
revealAnimation(".rect-white-project-left", .2, 'animation--rect__projects--left')
revealAnimation(".circle-project-right", .2, 'animation--circle__projects')
revealAnimation(".rect-white-footer-right ", .2, 'animation--rect__footer')
revealAnimation(".line-project-left", .2, 'display__line--project')
revealAnimation(".rect-white-project-bottom-right", .2, 'animation--rect__projects--right')

window.addEventListener('scroll', function () {
    parralax('.icons-skills', window.scrollY, -0.15, false)
    parralax('.vynil--container__vynil', window.scrollY, 0.15, false)
    if (sizes.width > 900) {
        if (traineeshipContainer.getBoundingClientRect().top - sizes.height < 0 && traineeshipContainer.getBoundingClientRect().top - sizes.height + traineeshipContainer.getBoundingClientRect().height > 0 - sizes.height) {
            traineeshipTexte.style.transform = `translateX(${((traineeshipContainer.getBoundingClientRect().top - sizes.height) + 550) * 0.5}px)`
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


// Event onload -> loader animation + look the browser language 
window.onload = function () {
    body.style.overflow = "hidden"

    setTimeout(function () {
        body.classList.add('loaded');
        window.scrollTo(0, 0);
        body.style.overflowX = "hidden"
        body.style.overflowY = ""
    }, 1000);
}