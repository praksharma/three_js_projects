gsap.registerPlugin(SplitText);

let splitChars = SplitText.create(".letters",{
    type: "chars",//"chars,words,lines" // or just chars is only one is needed
    smartWrap: true // characters stay together even after being split into individual divs
});

// try seeing the DOM of the .letters. You notice some aria-label and then individual characters, lines,words are isndie that div.
// GSAP does it so that the screen reader accessibility can still read the text not indiviual characters.
// we can disable this accessiblity feature by setting the config aria:"none"
// but who cares, leave it there.

let splitWords = SplitText.create(".words",{
    type: "words" // or just chars is only one is needed
});

let splitLines = SplitText.create(".lines",{
    type: "lines", // or just chars is only one is needed
    autoSplit: true, // when changing the screen size new lines devs are created/remove to accommodate for more/less space
    onSplit: (self) =>{ //GSAP need this onsplit method calling in order for the autosplit to work? Why? don't ask me. 
          // it update the animator with the lines created/removed by autoSplit.   
    }
});

// simple animation
function animate(elements, stagger, duration) {
    gsap.from(elements, {
        y: 20,
        autoAlpha: 0,  // set opacity to zero and hide the visbility of the element. much better than opacity
        stagger,
        duration
    });
}

// animate(splitChars.chars, 0.05, 1);
// animate(splitWords.words, 0.05, 1);
// animate(splitLines.lines, 0.25, 3);

// stagger on steroids
// more about stagger: https://gsap.com/resources/getting-started/Staggers/
function animateStagger(elements, stagger, duration) {
    gsap.from(elements, {
        yPercent: "random([-100, 100])" , // random value for y movement of chars, words, lines
        rotation: "random([-30, 30])", // random rotation to chars, words, lines
        autoAlpha: 0,  // set opacity to zero and hide the visbility of the element. much better than opacity
        duration,
        ease: "elastic.out",
        stagger:{
            amount:0.5,
            from: "random",
            repeat:-1, // repeat the animation (inside stagger they will not wait for others to finish, individual letters, words, lines will repeat themselves)
            yoyo: true // a sequence of tl.play(), tl.reverse() (inside stagger they will not wait for others to finish, individual letters, words, lines will repeat themselves)
        }
    });
}

animateStagger(splitChars.chars, 0.05, 1);
animateStagger(splitWords.words, 0.05, 1);
animateStagger(splitLines.lines, 0.25, 1);
// gsap.from(splitChars.chars,{
//     y: 20,
//     autoAlpha: 0,  // set opacity to zero and hide the visbility of the element. much better than opacity
//     stagger: 0.05,
//     duration: 1
// })

// gsap.from(splitWords.words,{
//     y: 20,
//     autoAlpha: 0,  // set opacity to zero and hide the visbility of the element. much better than opacity
//     stagger: 0.05,
//     duration: 1
// })

// gsap.from(splitLines.lines,{
//     y: 20,
//     autoAlpha: 0,  // set opacity to zero and hide the visbility of the element. much better than opacity
//     stagger: 0.25,
//     duration: 3
// })
