console.log('Sine plot animation');
import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js'; // to add mouse movements

const w = window.innerWidth;
const h = window.innerHeight; 
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w/h;
const near = 0.01;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 20; // zoom out by setting z to a larger value
const scene = new THREE.Scene();

// Basic background added
const controls = new OrbitControls(camera, renderer.domElement);
// add smooth deceleration to the animation when mouse is used to move the object.
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// add grid
const grid_size = 20;
const grid = new THREE.GridHelper(
    grid_size,  //size
    20,  // divisions
    "green", // axis color
    "green" // grid color
);
grid.rotation.x = Math.PI /2;
scene.add(grid);

// generate points for sin(x) and store them in a list as a THREE.Vector3
const points = [];
let x = -10;
points.push(new THREE.Vector3(x, Math.sin(x),0))
//define objects once
const geo = new THREE.BufferGeometry().setFromPoints(points);
const mat = new THREE.LineBasicMaterial({color: "white",});

const line = new THREE.Line(geo, mat);
scene.add(line);
function sine_points(){
    if (x < grid_size/2){ // grid is from -grid_size/2 to +grid_size/2
        // compute the sine value 
        points.push(new THREE.Vector3(x, Math.sin(x), 0));
        points.push(new THREE.Vector3(-Math.sin(x), x, 0));
        line.geometry.setFromPoints(points);

        x += 0.2; // controls the speed of the animation
    }

}

const hemiLight = new THREE.HemisphereLight("Blue")
scene.add(hemiLight)

function animate(t = 0){
    requestAnimationFrame(animate);

    // const time = t % 9000;
    // if (time < 3000) {
    //     sine_points();
    //     renderer.render(scene1, camera1);
    // }

    // else if (time < 6000) {
    //     fancy_points();
    //     renderer.render(scene2, camera2);
    // }

    // else {
    //     other_points();
    //     renderer.render(scene3, camera3);
    // }

    sine_points();
    renderer.render(scene, camera);
    // controls.update(); // disabled the camera manipulation
}
animate();