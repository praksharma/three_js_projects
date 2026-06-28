// var path = `M 10 80 Q 250 10 490 80` // path of string that we wanna modify
var final_path = `M 10 80 Q 250 80 490 80` // path to reset the string on (a stright line)

var string = document.querySelector("#string svg") // select the svg to activate an event listener on

// The idea is when mouse enters the div, trigger an event listener and update the string's path with event.x event.y coordinate which is the first and second entry after Q (quadratic bazier curve in the svg) in path 
// When the mouse leave the div, trigger an event listener mouseleave and update the string's path with final_path which is a straight string due to all y being equal. 

function mouseEnter() {
    console.log("mouse entered in the svg")
}
function mouseLeave() {
    console.log("mouse left the svg")
    // console.log({
    //     mouse_x: event.clientX,
    //     mouse_y: event.clientY
    // })
    gsap.to("svg path",{
            attr: {d:final_path},
            duration: 0.5,
            ease: "elastic.out(2,0.3)" // chnage animation speed with time. check out more here https://gsap.com/docs/v3/Eases/
        })
}

function mouseMove(event){
    console.log("mouse moved in the svg")
    // console.log(event) // check its output, there is x,y etc
    const path = `M 10 80 Q ${event.x} ${event.y} 490 80` // update the path with y mouse movement
    gsap.to("svg path",{ // only div is selected using #
        attr: {d: path}, // attr is used to manipualte attributes in gsap. Our svg path is stored in d, pass the updated path to d
        duration: 0.1, // fast response
        ease: "power2.out" // smooth power.in means start animation is slow and power.out means the end animation is slow. 
    })
}

string.addEventListener("mouseenter", mouseEnter) // not very useful for our string animation
string.addEventListener("mouseleave", mouseLeave)
string.addEventListener("mousemove", mouseMove)
