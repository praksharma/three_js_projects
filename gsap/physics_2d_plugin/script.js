gsap.registerPlugin(SplitText, Physics2DPlugin);

let splitCharsPage1 = SplitText.create("#page1 h1",{
    type: "chars",//"chars,words,lines" // or just chars is only one is needed
    smartWrap: true // characters stay together even after being split into individual divs
});

let splitCharsPage2 = SplitText.create("#page2 h1",{
    type: "chars",//"chars,words,lines" // or just chars is only one is needed
    smartWrap: true // characters stay together even after being split into individual divs
});



// // stagger on steroids
// // more about stagger: https://gsap.com/resources/getting-started/Staggers/
// function animateStagger(elements, stagger, duration) {
//     gsap.from(elements, {
//         yPercent: "random([-100, 100])" , // random value for y movement of chars, words, lines
//         rotation: "random([-30, 30])", // random rotation to chars, words, lines
//         autoAlpha: 0,  // set opacity to zero and hide the visbility of the element. much better than opacity
//         duration,
//         ease: "elastic.out",
//         stagger:{
//             amount:0.5,
//             from: "random",
//             repeat:-1, // repeat the animation (inside stagger they will not wait for others to finish, individual letters, words, lines will repeat themselves)
//             yoyo: true // a sequence of tl.play(), tl.reverse() (inside stagger they will not wait for others to finish, individual letters, words, lines will repeat themselves)
//         }
//     });
// }
tl1 = gsap.timeline()
// a fancy chaotic aniamtion of gsap.from type
tl1.from(splitCharsPage1.chars,{
    y: "random([-500, 500])",
    x: "random([-500, 500])",
    // css property
    rotation: "random([-360, 360])", // random rotation
    rotationX: "random([-720, 720])",
    rotationY: "random([-720, 720])",
    z: "random([-500, 500])",
    scale: "random([0.1, 5])",
    filter: "blur(20px)",// initially looks blur then materialise  due to gsap.from()
    duration:1,

    autoAlpha: 0, // set opacity to zero and hide the visbility of the element. much better than opacity
    stagger: { // how fast the total animation time is
        amount: 1,
        from: "random",
        // repeat: -1, // fun but no, stop it. lol
        // yoyo: true  // fun but no, stop it. lol
    },
    ease: "elastic.out"
})

// use physics2d to fall all the characters
/* 
Angle:
      270°
        ↑
180° ←      → 0°
        ↓
       90°
For falling, you generally want to launch downwards but upward is also fine.
*/

tl1.to(splitCharsPage1.chars,{
    physics2D:{
        angle: "random(240, 300)",  // random intial angles
        velocity: "random(300, 700)",  // initial velocity in the direction of angle
        gravity: 800                   // pull down
    },
    rotation: "random([-720, 720])",
    autoAlpha: 0,
    duration: 3,
    stagger: {
        amount: 0.5,
        from: "random"
    },
    // filter: "blur(10px)",// blur them as they fall down
    ease: "none" 
    // Physics2D computes the motion itself. 
    // If you apply an easing curve, you're effectively easing the physics, which usually looks unnatural.
})


// to scroll control multiple animation, add scrolltrigger to the timeline itslef.
tl2 = gsap.timeline({
    scrollTrigger:{
        trigger: "#page2", // when using pin always use the parents element, in this case the page2 itself. 
        scroller: "body",
        markers: true,
        start: "top 0%", // trigger when we reach the end of the page2
        end: "top -150%", // marker to reverse the animation, more percentage in negative for longer scroll
        // scrub:2, // scroll based animation forward/reverse (DO NOT CONTROL PHYSICS WITH SCRUB) I mean you can but don't
        pin: true // don't move until the animation is finished
    }})

tl2.from(splitCharsPage2.chars,{
    y: "random([-500, 500])",
    x: "random([-500, 500])",
    rotation: "random([-360, 360])", // random rotation
    rotationX: "random([-720, 720])",
    rotationY: "random([-720, 720])",
    z: "random([-500, 500])",
    scale: "random([0.1, 5])",
    stagger: {
        amount: 0.5,
        from: "random"
    },
    autoAlpha: 0,
    duration: 2,


})

tl2.to(splitCharsPage2.chars, {
  duration: 2,
  physics2D: { 
    velocity: "random(240, 300)",
    angle: "random(240, 300)",
    gravity: 400
},
    stagger: {
        amount: 0.5,
        from: "random"
    },
});

tl2.to(splitCharsPage2.chars, {
    autoAlpha: 0,
    duration: 0.3
},"-=0.3");