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
const far = 1000;


const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// const scene = new THREE.Scene();

// Basic background added
const controls = new OrbitControls(camera, renderer.domElement);
// add smooth deceleration to the animation when mouse is used to move the object.
controls.enableDamping = true;
controls.dampingFactor = 0.03;


const geo = new THREE.IcosahedronGeometry(1,8);
const mat = new THREE.MeshStandardMaterial({
    color: "white",
    flatShading: true,
});
const mesh1 = new THREE.Mesh(geo, mat);
const mesh2 = new THREE.Mesh(geo, mat);
const mesh3 = new THREE.Mesh(geo, mat);

const hemiLight = new THREE.HemisphereLight("blue", "cyan");

function createScene1(){
    const scene = new THREE.Scene();
    const light = new THREE.HemisphereLight("blue", "cyan", 2);
    scene.add(mesh1);
    scene.add(light);
    // mesh.scale.setScalar(1.2)
    return {scene, mesh: mesh1}; // if you don't want to use the mesh just return scene
}

function createScene2(){
    const scene = new THREE.Scene();
    const light = new THREE.HemisphereLight("blue", "cyan", 2);
    mesh2.scale.setScalar(0.9)

    scene.add(mesh2);
    scene.add(light);

    return {scene, mesh: mesh2};
}

function createScene3(){
    const scene = new THREE.Scene();
    const light = new THREE.HemisphereLight("blue", "cyan", 2);
    mesh3.scale.setScalar(0.8)

    scene.add(mesh3);
    scene.add(light);

    return {scene, mesh: mesh3};
}

// scene 1
const scene1 = createScene1();
// scene 2
const scene2 = createScene2();
// scene 3
const scene3 = createScene3(); 

// get div with id="label" to put text on
const label = document.getElementById("label");

let active = 0;
function animate(t = 0){
    requestAnimationFrame(animate);
    // mesh.rotation.y = t*0.0005;

    // time duration for each scene
    const time = t % 9000;

    if (time < 3000) {
        label.textContent = "Scene 1";
        active = scene1;
        active.mesh.rotation.y = t*0.005;

        // renderer.render(scene1, camera);
    }
    else if (time < 6000) {
        label.textContent = "Scene 2";
        active = scene2;
        active.mesh.rotation.y = -t*0.005;

        // renderer.render(scene2, camera);
    }
    else {
        label.textContent = "Scene 3";
        active = scene3;
        active.mesh.rotation.y = -t*0.005;
        active.mesh.rotation.x = -t*0.005;
        // renderer.render(scene3, camera);
    }


    // controls.update();

    renderer.render(active.scene, camera);

}
animate();
// renderer.render(scene, camera)