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
});
const mesh = new THREE.Mesh(geo, mat);

scene.add(mesh);

const hemiLight = new THREE.HemisphereLight("blue", "cyan");
scene.add(hemiLight);

function animate(t = 0){
    requestAnimationFrame(animate);
    mesh.rotation.y = t*0.0005;

    // time duration for each scene
    const time = t % 9000;

    if (time < 3000) {
        sine_points();
        renderer.render(scene1, camera1);
    }
    else if (time < 6000) {
        fancy_points();
        renderer.render(scene2, camera2);
    }
    else {
        other_points();
        renderer.render(scene3, camera3);
    }
}

    controls.update();
    renderer.render(scene, camera);

}
animate();
// renderer.render(scene, camera)