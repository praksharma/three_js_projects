// the idea is to move the text banner left or right depending on the scrolling wheel movement on the page
// so we add an event listener on the entire window, no div, not document

window.addEventListener("wheel", function (event) {
    // console.log(event) // print this to see the option
    // console.log(event.wheelDeltaY) // delta y will tell you wheel movement in y direction
    var mouseWheelMovement = event.wheelDeltaY
    if (mouseWheelMovement > 0) {
        console.log("Scroll up")
        gsap.to(".marque", {
            transform: "translateX(-200%)", // .marque has a init will -100% transform -200% will mvoew the content more left
            repeat: -1, // endless repeat
            duration: 2,
            ease: "none" // constant speed
        })
        gsap.to(".marque img", {
            rotate: 180
        })
    }
    else {
        console.log("Scroll down")
        gsap.to(".marque", {
            transform: "translateX(0%)", // .marque has a init will -100% transform so 0% move the content right
            repeat: -1, // endless repeat
            duration: 2,
            ease: "none" // constant speed
        })
        gsap.to(".marque img", {
            rotate: 0
        })

    }
})

