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
const material = new THREE.MeshPhongMaterial( { color: "red", side: THREE.DoubleSide, flatShading: true } );
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


// GUI
const gui = new GUI()
const world = {
    plane: {
        width: 5,
        height: 5
    }
}
// change width of the plane
gui.add(world.plane, "width", 1, 10).onChange(()=>{
    console.log(world.plane.width)
    // delete the old plane mesh
    plane.geometry.dispose();
    plane.geometry = new THREE.PlaneGeometry(world.plane.width, 5, 10, 10);
    plane_coordinate_manipulation(plane);
})
// change height of the plane
gui.add(world.plane, "height", 1, 10).onChange(()=>{
    console.log(world.plane.height)
    // delete the old plane mesh
    plane.geometry.dispose();
    plane.geometry = new THREE.PlaneGeometry(5, world.plane.height, 10, 10);
    plane_coordinate_manipulation(plane);
})

function animate(t = 0){
    requestAnimationFrame(animate); // sort of a loop between frame and animate function
    controls.update();
    renderer.render(scene, camera);

}
animate();