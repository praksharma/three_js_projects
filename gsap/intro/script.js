gsap.to("#box1",{
    x: 500,
    y: 300,
    duration: 2,
    delay:1,
    backgroundColor: "yellow"
})
gsap.to("#box2",{
    x: 500,
    y: -300,
    duration: 2,
    delay:1,
    rotate: 360
})
gsap.from("#box3",{
    x: 500,
    y: 0,
    duration: 2,
    delay:1,
    backgroundColor: "brown",
})
gsap.to("#box4",{
    x: 500,
    y: 0,
    duration: 2,
    delay:1,
    rotate:360,
    borderRadius: "50%",
    backgroundColor: "blue",
    scale: 0.7
})