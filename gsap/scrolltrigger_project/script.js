// gsap.from("#page5 h1",{
//     delay: 0,
//     scale: 0,
//     // x:500,
//     scrollTrigger: {
//         trigger: "#page5 h1",
//         scroller: "body",
//         markers: true, // shows you the markers in the webpage, indicating what's where
//         start: "top 60%",
//         end: "top -45%", // if this end is too much in negative values you can scroll the pinned part to next page
//         scrub: 2, // Add capability to forward/reverse the animation with scrolling. add dampness in the animation with the number. 5 is a lot. 
//         pin: true // pin thing with scroller
//     }
// })

gsap.to("#page2 h1",{
    transform: "translateX(-270%)",
    scrollTrigger:{
        trigger: "#page2", // when using pin always use the parents element, in this case the page2 itself. 
        scroller: "body",
        markers: true,
        start: "top 0%", // trigger when we reach the end of the page2
        end: "top -150%", // reverse the animation, more percentage in negative for longer scroll
        scrub:2, // scroll based animation forward/reverse
        pin: true // don't move until the animation is finished
    }
})