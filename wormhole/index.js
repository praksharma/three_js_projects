console.log('wormhole');
import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js'; // to add mouse movements
import spline from "./scripts/spline.js" // set of vertices ofor the path of the wormhole

const w = window.innerWidth;
const h = window.innerHeight; 
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 1000;


const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

// Basic background added
const controls = new OrbitControls(camera, renderer.domElement);
// add smooth deceleration to the animation when mouse is used to move the object.
controls.enableDamping = true;
controls.dampingFactor = 0.03;

console.log(spline);

// create a path from the splines
const points = spline.getPoints(100);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({
    color: "red",
});
const line = new THREE.Line(geometry, material);
// scene.add(line); // just to see the line

// Create a tube around the path
const tubeGeo = new THREE.TubeGeometry(spline, 250, 0.65, 20, true);
// tubularSegments — The number of segments that make up the tube. Expects a Integer. Default 64. 3 for triangle paths.
// radius — The radius of the tube. Expects a Float. Default 1.
// radialSegments — The number of segments that make up the cross-section. Expects a Integer. Default 8. 4 for square
// closed — Is the tube open or closed. Default false.

const tubeMat = new THREE.MeshBasicMaterial({
    color: "green",
    // side: THREE.DoubleSide, // if wireframe is disable, the interior wvbiew will be nothing, so double side render the interior side.
    wireframe: true,
});

const tube = new THREE.Mesh(tubeGeo, tubeMat)
scene.add(tube);
// const tubeMEsh


const hemiLight = new THREE.HemisphereLight("white", "cyan");
scene.add(hemiLight);

function animate(t = 0){
    requestAnimationFrame(animate);
    // console.log(t);
    // Mesh.rotation.y = t*0.0005;
    // earthGroup.rotation.x = t*0.00001;

    controls.update();
    renderer.render(scene, camera);

}
animate();