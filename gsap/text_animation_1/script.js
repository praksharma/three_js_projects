// the aim is to animate the text within the h1 or anything.
var h1 = document.querySelector("h1") // select the h1
var h1Text = h1.textContent

var h2 = document.querySelector("h2")
var h2Text = h2.textContent

console.log(h1Text)
// split the letter in the h1 tag string (innerHTML)
splittedText = h1Text.split("") // you can type " ", "e" or anything. I nothing is typed, meaning "", then it splits the individual characters.
// console.log(splittedText)

var clutter = "" // empty string

// a loop that is similar to `for items in list` in python
splittedText.forEach(function(elem, idx){ // the name can be e, xyz, or anything, same for idx
    console.log(elem, idx)
    // clutter += e // append all character to the empty string clutter
    // clutter += `<span>${elem}</span>` // each character become a separate span

    // to split the animation in two
    var half_value = Math.floor(splittedText.length/2) // a int type conversion of the middle of the h1's text
    if (idx< half_value){
        // console.log(idx)
        clutter += `<span class="a">${elem}</span>` // use different class to differential first hald and second half of the text
    }
    else{
        clutter += `<span class="b">${elem}</span>` // use different class to differential first hald and second half of the text
    }
})

// reassign the clutter to h1 tag element
h1.innerHTML = clutter

// simple animation]
// gsap.from("h1 span",{
//     y:100,
//     duration:1,
//     opacity: 0,
//     stagger: 0.2 // a negative will reverse the animation
// })

gsap.from(".a",{
    y:100,
    duration:1,
    opacity: 0,
    stagger: 0.2 // a negative will reverse the animation
})

gsap.from(".b",{
    y:100,
    duration:1,
    opacity: 0,
    stagger: -0.2 // a negative will reverse the animation
})
////////// REPEAT AGAIN FOR H2
splittedText = h2Text.split("")
// console.log(splittedText)

clutter = "" //empty string
splittedText.forEach(function(elem,idx){
    // console.log(elem, idx)
    clutter += `<span class="c">${elem}</span>`
})

h2.innerHTML = clutter; // reassign the clutter to h2

gsap.from(".c",{
    y: 100,
    duration:1,
    stagger: 0.2
})