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
    scale: 1.3
})

gsap.from("#box5 h1", {
    color: "red",
    duration: 2,
    delay:1,
    opacity: 0, // initially this should be hidden and they reveal itself
    y: -50
})
gsap.from("#box6 h1", {
    color: "red",
    duration: 2,
    delay:1,
    opacity: 0, // initially this should be hidden and they reveal itself
    y: -50,
    // each h1 in box 6 will come one by one, speed between 0 and 1, 0 being fastest and 1 being slowest
    // a negative stagger means the animation order of h1 will be reversed
    stagger: 0.5,
})

gsap.to("#box7",{
    x: 500,
    y: 0,
    duration: 1,
    delay:1,
    rotate:360,
    borderRadius: "50%",
    backgroundColor: "blue",
    repeat: 4, //number of time to repeat the animation, -1 means infinite repeat
    yoyo: true //go back and forth
})