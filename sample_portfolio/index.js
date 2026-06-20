console.log('A basic primitive');
import * as THREE from "three";
import GUI from "lil-gui"; // basic GUI on web
import { OrbitControls } from 'jsm/controls/OrbitControls.js'; // to add mouse movements

const w = innerWidth;
const h = innerHeight; 
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(w, h);
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

const scene = new THREE.Scene();

// Basic background added
const controls = new OrbitControls(camera, renderer.domElement);
// add smooth deceleration to the animation when mouse is used to move the object.
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Plane: https://threejs.org/docs/?q=plane#PlaneGeometry
const geometry = new THREE.PlaneGeometry(5, 5, 10, 10);

// https://threejs.org/docs/?q=phon#MeshPhongMaterial
const material = new THREE.MeshPhongMaterial( {
    // color: "red", 
    side: THREE.DoubleSide, 
    flatShading: true,
    vertexColors: true
});
const plane = new THREE.Mesh(geometry, material);
console.log(plane);
console.log(plane.geometry.attributes.position.array) // this be obtained form the chromium inspect console. no need to remember it.
scene.add(plane); // add the plane to the scene

// run plane manipualtion the first time
plane_coordinate_manipulation(plane)

// we can modify these coordinates of the mesh to make a jagged plane
function plane_coordinate_manipulation(plane){
    const {array} = plane.geometry.attributes.position; // object destructuring
    // console.log(array.length)
    for (let i = 3; i < array.length; i +=3){ // i=i+3 because the array are x,y,z so we are looping over the each x,y,z as i,i+1,i+2
        // console.log(array[i])
        const x = array[i]
        const y = array[i+1]
        const z = array[i+2]

        array[i + 2] = z + Math.random()
    }
}

// add lights
const light = new THREE.DirectionalLight({
    color: "white",
    intensity: 1
})
light.position.set(0, 0 ,5)
scene.add(light)
const backlight = new THREE.DirectionalLight({
    color: "white",
    intensity: 1
})
backlight.position.set(0, 0 ,-5)
scene.add(backlight)

// GUI
const gui = new GUI()
const world = {
    plane: {
        width: 5,
        height: 5,
        widthSegments: 10,
        heightSegments: 10
    }
}
// change width of the plane
gui.add(world.plane, "width", 1, 10).onChange(recreatePlane)
// change height of the plane
gui.add(world.plane, "height", 1, 10).onChange(recreatePlane)
// change the widthSegments
gui.add(world.plane, "widthSegments", 1, 50).onChange(recreatePlane)
// change the heightSegments
gui.add(world.plane, "heightSegments", 1, 50).onChange(recreatePlane)

// function to assign a new width and height to the plane's Mesh and also manipualte the segments
function recreatePlane(){
    // this helps you expand the console.log in the console as an object.
    console.log({
        width: world.plane.width,
        height: world.plane.height,
        widthSegments: world.plane.widthSegments,
        heightSegments: world.plane.heightSegments,
    });
    // delete the old plane mesh
    plane.geometry.dispose();
    // assign the plane a new geometry with width and height from the GUI slider
    plane.geometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments);
    plane_coordinate_manipulation(plane);
    
}

// We plan to glow the area on the plane where mouse intersects
// We need the mouse coordinates.
// For that we register an event listener with the browser.
// The browser already knows when the mouse moves.
// When a "mousemove" event occurs, it will call our
// mouseCoord() function and pass it an event object
// containing information such as event.clientX and event.clientY.
addEventListener("mousemove",mouseCoord)
const mouse = {
    x: undefined,
    y: undefined
}
function mouseCoord(){
    // Browser mouse coordinates:
    // (0,0) is the top-left corner of the window.
    // x increases to the right.
    // y increases downward.

    // Three.js Normalized Device Coordinates (NDC):
    // (0,0) is the center of the screen.
    // x ranges from -1 to +1.
    // y ranges from -1 to +1.
    console.log({
        mouse_x: event.clientX,
        mouse_y: event.clientY,
        normalised_mouse_x: mouse.x,
        normalised_mouse_y: mouse.y,
    })
    // Normalizing the coordinates
    //  event.clientX / innerWidth give you [0, innerWidth] into [0, 1]
    //      The centre of the screen is now 0.5.
    // we multiple the thing by 2
    //       [0, 1] -> [0, 2]
    // and then surbtract 1
    //       [0, 2] -> [-1, 1]
    // normalised x = (event.clientX / innerWidth) * 2 - 1;
    // normalised y = -((event.clientY / innerHeight) * 2 - 1);
    // - because the browser y grows DOWNWARDS while Three.js y grows UPWARDS.
    // now go to the console and see the outputs of the normalised coordiante are zero when mouse is at the centre.

    // normalise the coordinates in the range [-1,1]
    // update the mouse x and y variables with the normalised mouse coordinates
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -((event.clientY / innerHeight) * 2 - 1);
}


// add raycaster
// it detects whether our mouse is touching a 3d object or not
// that is why we spent so much time on normalised mouse coordinates
// next is initialise the object
const raycaster = new THREE.Raycaster()
// add colour for each triangular face of the plane

const colors = [];
for (let i = 0; i < plane.geometry.attributes.position.count; i++){
    colors.push(1, 0, 0)
}
    // add color to each face
    // check out the plane.geometry in the console
    // there is no color but we can add a color just like normal, position,uv that are Float32BufferAttribute type object with a 
    // new THREE.BufferAttribute(new Float32Array([x,y,z]), rgb so 3). Just remember it. Don't think too much.
    plane.geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3))


function animate(t = 0){
    requestAnimationFrame(animate); // sort of a loop between frame and animate function
    controls.update();
    renderer.render(scene, camera);
    // if normalised mouse coordinates and camera is used to init the raycaster
    raycaster.setFromCamera(mouse, camera)
    // then you pass any object like our plan mesh to detect whether it intersected or not.
    const intersects = raycaster.intersectObject(plane);
    // if it intersects the objects will have non-zero length
    if (intersects.length > 0) {
        // log the face of the plane which the mouse intersects with
        console.log({
            intersects: "yes",
            face: intersects[0].face
        })
        //add change the color of all vertices a,b,c or the face to 0 means black
        // at a given point we might intersect objects, but we just ignore the others can use only 
        // first face if we intersect multiple faces, using intersects[0].face
        const {color} = intersects[0].object.geometry.attributes // store color in a variable using destructuring 
        color.setX(intersects[0].face.a, 0);
        color.setY(intersects[0].face.a, 0);
        color.setZ(intersects[0].face.a, 1);

        color.setX(intersects[0].face.b, 0);
        color.setY(intersects[0].face.b, 0);
        color.setZ(intersects[0].face.b, 1);

        color.setX(intersects[0].face.c, 0);
        color.setY(intersects[0].face.c, 0);
        color.setZ(intersects[0].face.c, 1);



        intersects[0].object.geometry.attributes.color.needsUpdate = true // tell GPU to update this and stop beign lazy for  optimisation
    }
}
animate();