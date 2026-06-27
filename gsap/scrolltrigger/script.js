// // store the timeline in a variable tl
// var tl = gsap.timeline()

gsap.from("#page1 #box",{
    delay: 1,
    scale: 0,
    rotate: 360
})

gsap.from("#page2 #box",{
    delay: 1,
    scale: 0,
    rotate: 360,
    scrollTrigger: "#page2 #box"
})
gsap.from("#page3 #box",{
    delay: 0,
    scale: 0,
    rotate: 360,
    scrollTrigger: {
        trigger: "#page3 #box",
        scroller: "body",
        markers: true, // shows you the markers in the webpage, indicating what's where
        // start should be below the end, otherwise object won't animate
        start: "top 60%",
        end: "top 50%",
        scrub: 2 // Add capability to forward/reverse the animation with scrolling. add dampness in the animation with the number. 5 is a lot. 
    }
})

gsap.from("#page4 h1",{
    delay: 0,
    scale: 0,
    x:500,
    scrollTrigger: {
        trigger: "#page4 h1",
        scroller: "body",
        markers: true, // shows you the markers in the webpage, indicating what's where
        start: "top 60%",
        end: "top 50%",
        scrub: 2
    }
})

gsap.from("#page4 h2",{
    delay: 0,
    scale: 0,
    x:-500,
    scrollTrigger: {
        trigger: "#page4 h2",
        scroller: "body",
        markers: true, // shows you the markers in the webpage, indicating what's where
        start: "top 60%",
        end: "top 50%",
        scrub: 2
    }
})

gsap.from("#page5 h1",{
    delay: 0,
    scale: 0,
    // x:500,
    scrollTrigger: {
        trigger: "#page5 h1",
        scroller: "body",
        markers: true, // shows you the markers in the webpage, indicating what's where
        start: "top 60%",
        end: "top -45%", // if this end is too much in negative values you can scroll the pinned part to next page
        scrub: 2, // Add capability to forward/reverse the animation with scrolling. add dampness in the animation with the number. 5 is a lot. 
        pin: true // pin thing with scroller
    }
})

// #page5 h1 is pinned to the scroller and will merge with #page6 h1 visually
gsap.from("#page6 h1",{
    delay: 0,
    scale: 0,
    // x:500,
    scrollTrigger: {
        trigger: "#page6 h1",
        scroller: "body",
        markers: true, // shows you the markers in the webpage, indicating what's where
        start: "top 60%",
        end: "top 55%",
        scrub: 2,
    }
})