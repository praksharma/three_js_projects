console.log('A basic primitive');
import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js'; // to add mouse movements

const w = window.innerWidth;
const h = window.innerHeight; 
const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;


const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

// Basic background added
const controls = new OrbitControls(camera, renderer.domElement);
// add smooth deceleration to the animation when mouse is used to move the object.
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const loader = new THREE.TextureLoader();
const geo = new THREE.IcosahedronGeometry(1,16);
// mathematically they use something called UV mapping to put pixels from the image on the sphere.
const mat = new THREE.MeshStandardMaterial({
    map: loader.load("textures/2k_earth_daymap.jpg"),
    flatShading: false,
});
const mesh = new THREE.Mesh(geo, mat);

scene.add(mesh);


const hemiLight = new THREE.HemisphereLight("white");
scene.add(hemiLight);

function animate(t = 0){
    requestAnimationFrame(animate);
    // console.log(t);
    // mesh.scale.setScalar(Math.cos(t*0.01));
    mesh.rotation.y = t*0.00001;
    mesh.rotation.x = t*0.00001;

    controls.update();
    renderer.render(scene, camera);

}
animate();
// renderer.render(scene, camera)