var tl = gsap.timeline() // create a new timeline
// add all elments you want to use the event listeners with
var menu = document.querySelector("#nav i")
var close = document.querySelector("#full i")
var fullElement = document.querySelector("#full")
// console.log(menu)

// add all event listeners
menu.addEventListener("mouseenter", bringMenu)
close.addEventListener("click", closeMenu)
fullElement.addEventListener("mouseleave", closeMenu)

// define the menu opening animation in the timeline. tl.reverse() will close the menu saving our time.
tl.to("#full", {
        right: "0%"
    })
    tl.from("#full h4", {
        x: 100,
        duration: 0.5,
        stagger: 0.2,
        opacity: 0,
        ease: "power4.out" // slow the animation of laoding menu with time, power4 make the end much more slow
    })
    tl.from("#full i",{
        opacity: 0
    })

// prevent the animation from automatic execution
tl.pause()
function bringMenu() {
    tl.play()
}

function closeMenu() {
    tl.reverse() // closes the menu
}