// store the timeline in a variable tl
var tl = gsap.timeline()

tl.to("#box1",{
    x:500
})
tl.to("#box2",{
    x:500
})
// animate entire navbar at the same time
tl.from("#nav", {
    y: -30,
    opacity: 0,
    duration: 1
})

// animate the navbar's h2 and navbar's h4 one by one

tl.from("#nav2 h2", {
    y: -30,
    opacity: 0,
    duration: 0.2
})

tl.from("#submenu2 h4",{
    y:-30,
    opacity:0,
    stagger: 0.2
})

tl.from("#centreContent h1",{
    y:20,
    opacity:0,
    scale: 0.9
})