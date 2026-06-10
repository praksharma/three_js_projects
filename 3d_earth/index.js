console.log('3D EARTH');
import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js'; // to add mouse movements
import {getFresnelMat} from "./src/getFresnelMat.js" // earth halo material
import getStarfield from "./src/getStarfield.js"; // add stars
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

const earthGroup = new THREE.Group(); // manipulate multiple object at the same time.
earthGroup.rotateZ = -23.4 * Math.PI /180 // 23.4 degrees tilt of the earth
scene.add(earthGroup);

const stars = getStarfield({numStars: 2000});
scene.add(stars);

const detail = 100;
const loader = new THREE.TextureLoader();
const geo = new THREE.IcosahedronGeometry(1, detail);
// mathematically they use something called UV mapping to put pixels from the image on the sphere.
const mat = new THREE.MeshStandardMaterial({
    map: loader.load("textures/8k_earth_daymap.jpg"),
    flatShading: false,
});
const earthMesh = new THREE.Mesh(geo, mat);

earthGroup.add(earthMesh);


// const hemiLight = new THREE.HemisphereLight("white");
// scene.add(hemiLight);
// We can add a better directional light.
const sunLight = new THREE.DirectionalLight("white")
sunLight.position.set(-2,0,+1) // x,y are classical axis and z is towards or away from you
scene.add(sunLight);

// add night sky of the earth
const nightSkyMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/8k_earth_nightmap.jpg"), // use night light of earth as texture for the new mesh
    blending: THREE.AdditiveBlending,  // only preserve the bright spots, meanign we preseve the day light earth map
    opacity: 0.3,
    // transparent: true,
});

const nightSkyMesh = new THREE.Mesh(geo, nightSkyMat)
earthGroup.add(nightSkyMesh);

// add clouds
const cloudsMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/8k_earth_clouds.jpg"),
    blending: THREE.AdditiveBlending,
    opacity: 0.2,
})

const cloudMesh = new THREE.Mesh(geo, cloudsMat)
cloudMesh.scale.setScalar(1.001)
earthGroup.add(cloudMesh);

// Add earth's halo using Fresnel's material
const frenselMat = getFresnelMat();
const frenselMesh = new THREE.Mesh(geo, frenselMat);
frenselMesh.scale.setScalar(1.001)
earthGroup.add(frenselMesh);


function animate(t = 0){
    requestAnimationFrame(animate);
    // console.log(t);
    earthGroup.rotation.y = t*0.00005;
    earthGroup.rotation.x = t*0.00001;
    cloudMesh.rotation.y = t*0.00002; // override the cloud rotation as it is already part of earthGroup and make is rotate faster as in reality.

    controls.update();
    renderer.render(scene, camera);

}
animate();
// renderer.render(scene, camera)