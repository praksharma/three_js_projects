var main = document.querySelector("#main")
var cursor = document.querySelector("#cursor")

// The aim is to add event listener to the main div and check the event.x and event.y
function mouseMoved(event){
    console.log({
        x_coord: event.x,
        y_coord: event.y
    })
    gsap.to(cursor,{ // yes we can use elements stored in a variable, no need to use css selector all the time
        x: event.x,
        y: event.y,
        duration:0.5,
        ease:"back.out(4)"
    })
}

main.addEventListener("mousemove",mouseMoved)


// let us change the cursor to something else when the mouse enter in the image area.
var image = document.querySelector("#image")

function imageMouseEnters(){ // don't need an event here
    console.log("mouse entered the image")
    cursor.innerHTML = "A"
    gsap.to(cursor,{
        scale:2,
        fontSize: 10, // css property
    })
}

function imageMouseLeave(){
    // check the magic done by pointer-events: none in #cursor css file
    console.log("mouse left the image")
    gsap.to(cursor,{
        scale:1
    })
}

image.addEventListener("mouseenter", imageMouseEnters)
image.addEventListener("mouseleave", imageMouseLeave)
