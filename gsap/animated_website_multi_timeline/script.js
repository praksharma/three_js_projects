var tl = gsap.timeline()
function page1Animation(){
// animate the nav bar
tl.from("#left, .part2 h4, .part2 button",{
    y:-20,
    opacity: 0,
    delay: 1,
    // stagger only works when the specified objects are multiple in numbers. so .part2 h4 are 4
    stagger:0.2
})

tl.from(".center-part-1 h1, .center-part-1 p, .center-part-1 button",{
    x:-300,
    opacity: 0,
    stagger: 0.2
})

tl.from(".center-part-2",{ // .center-part-2 is same as .center-part-2 img coz there is only one element in the div
    x:300,
    opacity: 0
}, "-=1") // run the animation one second ago, meaning with the last animation.

tl.from(".section1Bottom img",{ // .section1Bottom will just animate everything at the same time, img are multiple so stagger will work
    y:20,
    opacity:0,
    stagger: 0.2
})
}

// create a second timeline and scroll trigger this timeline
var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger: ".services",
        scroller: "body",
        // markers: true,
        start: "top 50%",
        end: "top 10%",
        scrub:2
    }
})

function page2Animation(){
tl2.from(".services h3",{
    x : -20,
    opacity: 0,
    duration: 0.5,

})

tl2.from(".services p",{
    x : 20,
    opacity: 0,
}, "-=0.5") // trigger with the previous one, cool trick isn't it?
}
// page2Animation()
// another timeline for the next page/view
var tl3 = gsap.timeline({
    scrollTrigger:{
        trigger: ".container .scrollTriggerPoint",
        scroller: "body",
        // markers: true,
        start: "top 75%",
        end: "top 45%",
        scrub:2 
    }
})

function page3Animation(){
tl3.from(".elem.line1",{ // target only .elem.line1 becasue there are other line1 classes
    opacity:0,
    x: -70,
    ease: "power4.out" // speed up the appearance from opacity
},"random_string")
tl3.from(".elem.line2",{
    opacity:0,
    x: +70,
    ease: "power4.out" // speed up the appearance from opacity
},"random_string")

// If you want to run two things together in a timeline, just pass a random string in second argument of tl.from/to(,"random_string")
// You can even offset relative to the label:tl.from(".button", {...}, "random_string+=0.3")
// or tl.from(".button", {...}, "random_string-=0.2")
}

page1Animation()
page2Animation()
page3Animation()