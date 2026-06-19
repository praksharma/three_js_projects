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

// GUI
const gui = new GUI();
const params = {
    height_of_bubble: 0.1,
    speed_of_bubble_movement: 0.01
};
const height_of_bubble = gui.add(
    params,
    'height_of_bubble',
    0,
    1
).name('Bubble Height');

const speed_of_bubble_movement = gui.add(
    params,
    'speed_of_bubble_movement',
    0,
    0.025
).name('Bubble Speed');
// heightSlider.name('Bubble Height');
// speedSlider.name('Bubble Speed');

// Plane: https://threejs.org/docs/?q=plane#PlaneGeometry
const geometry = new THREE.PlaneGeometry(5, 5, 100, 100);

// https://threejs.org/docs/?q=phon#MeshPhongMaterial
const material = new THREE.MeshPhongMaterial( { color: "red", side: THREE.DoubleSide, flatShading: true } );
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

console.log(plane);
console.log(plane.geometry.attributes.position.array) // this be obtained form the chromium inspect console. no need to remember it.

// we can modify these coordinates of the mesh to make a wave like carpet
//
// const height_of_bubble = 0.1; // increase for higher bubbles
// const speed_of_bubble_movement = 0.01

function visualiser(t){
    const {array} = plane.geometry.attributes.position; // object destructuring
    // console.log(array.length)
    for (let i = 3; i < array.length; i +=3){ // i=i+3 because the array are x,y,z so we are looping over the each x,y,z as i,i+1,i+2
        // console.log(array[i])
        const x = array[i]
        const y = array[i+1]
        const z = array[i+2]

        // array[i + 2] = Math.sin(Math.tan(x) * Math.tan(y)  + Math.sin(t)*0.001 )*0.1
        array[i + 2] = (Math.sin(x * 5 + t * params.speed_of_bubble_movement) * Math.cos(y * 5 + t * params.speed_of_bubble_movement)) * params.height_of_bubble;
    }
    // tell the three.js to continuously load new vertices to the GPU. Otherwise, it will stops after copying the first time.
    // do not put this inside the loop. No need to tell Three.js 30,000 times per frame. Do it once after all vertices are changed
    plane.geometry.attributes.position.needsUpdate = true;

}

const Light = new THREE.HemisphereLight("Blue")
Light.position.set(2,2,-15) // x,y are classical axis and z is towards or away from you
scene.add(Light);

function animate(t = 0){
    requestAnimationFrame(animate); // sort of a loop between frame and animate function
    visualiser(t);
    controls.update();
    renderer.render(scene, camera);

}
animate();