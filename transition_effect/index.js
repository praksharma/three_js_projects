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

const geo = new THREE.IcosahedronGeometry(1,8);
const mat = new THREE.MeshStandardMaterial({
    color: "white",
    flatShading: true,
    transparent: true, // must be transparent to enable opacity changes
});
const mesh = new THREE.Mesh(geo, mat);

scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: "white",
    transparent: true, // must be transparent to enable opacity changes
    wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat);
scene.add(wireMesh); // combine the wirefame mesh with geo mesh

const hemiLight = new THREE.HemisphereLight("blue", "cyan");
scene.add(hemiLight);

function animate(t = 0){
    requestAnimationFrame(animate);
    // this will be a value between 0 and 1, helping use to set the opacity of the meshes
    const transitionVariable = (Math.sin(t*0.005) + 1) / 2; // t*005 converts the time to second so things chnages slowly
    mat.opacity = transitionVariable;
    wireMat.opacity = 1 - transitionVariable;
    wireMesh.scale.setScalar(1.005); // make wireframe slightly bigger to show the transition like revealing animation.
    // console.log(transitionVariable)

    // controls.update();
    renderer.render(scene, camera);

}
animate();
// renderer.render(scene, camera)