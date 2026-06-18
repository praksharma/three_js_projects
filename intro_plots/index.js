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

// Basic background added
const controls = new OrbitControls(camera, renderer.domElement);
// add smooth deceleration to the animation when mouse is used to move the object.
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// add grid
const grid_size = 20;
function createGrids(){ 
    const grid = new THREE.GridHelper(
        grid_size,  //size
        20,  // divisions
        "green", // axis color
        "green" // grid color
        );
    grid.rotation.x = Math.PI / 2;

    return grid;
    }

// generate points for sin(x) and store them in a list as a THREE.Vector3
// these need to be global.
// our sine functions need them
const points_1 = [];
const points_2 = [];
const points_3 = [];


// points_1.push(new THREE.Vector3(x, Math.sin(x),0))
let x1 = -10; 
let x2 = -10; 
let x3 = -10; 

//define objects once
const geo_1 = new THREE.BufferGeometry().setFromPoints(points_1);
const geo_2 = new THREE.BufferGeometry().setFromPoints(points_2);
const geo_3 = new THREE.BufferGeometry().setFromPoints(points_3);


const mat = new THREE.LineBasicMaterial({color: "white",}); // can be shared

const line1 = new THREE.Line(geo_1, mat);
const line2 = new THREE.Line(geo_2, mat);
const line3 = new THREE.Line(geo_3, mat);

function createScene1(){
    const scene = new THREE.Scene();
    scene.add(createGrids());
    points_1.push(new THREE.Vector3(x1, Math.sin(x1),0))

    scene.add(line1);
    // sine_points(line1)
    const hemiLight = new THREE.HemisphereLight("Blue")
    scene.add(hemiLight)

 return {scene, mesh: line1}
}
function sine_points_1(){
    if (x1 < grid_size/2){ // grid is from -grid_size/2 to +grid_size/2
        // compute the sine value 
        points_1.push(new THREE.Vector3(x1, Math.sin(x1), 0));
        // points.push(new THREE.Vector3(-Math.sin(x), x, 0));
        line1.geometry.setFromPoints(points_1);

        x1 += 0.2; // controls the speed of the animation
    }

}

function createScene2(){
    const scene = new THREE.Scene();
    scene.add(createGrids());
    points_2.push(new THREE.Vector3(Math.sin(x2), x2, 0))
    scene.add(line2);

    const hemiLight = new THREE.HemisphereLight("Blue")
    scene.add(hemiLight)

 return {scene, mesh: line2}
}



function sine_points_2(){
    if (x2 < grid_size/2){ // grid is from -grid_size/2 to +grid_size/2
        // compute the sine value 
        // points_2.push(new THREE.Vector3(x2, Math.sin(x2), 0));
        points_2.push(new THREE.Vector3(-Math.sin(x2), x2, 0));
        line2.geometry.setFromPoints(points_2);

        x2 += 0.2; // controls the speed of the animation
    }

}

function createScene3(){
    const scene = new THREE.Scene();
    scene.add(createGrids());
    points_3.push(new THREE.Vector3(Math.sin(x3), x3, 0))
    scene.add(line3);

    const hemiLight = new THREE.HemisphereLight("Blue")
    scene.add(hemiLight)

 return {scene, mesh: line3}
}

function sine_points_3(){
    if (x3 < grid_size/2){ // grid is from -grid_size/2 to +grid_size/2
        // compute the sine value 
        points_3.push(new THREE.Vector3(x3, Math.sin(x3), 0));
        points_3.push(new THREE.Vector3(Math.sin(x3), x3, 0));
        line3.geometry.setFromPoints(points_3);

        x3 += 0.2; // controls the speed of the animation
    }

}

// scenes initialisation
const scene1 = createScene1();
const scene2 = createScene2();
const scene3 = createScene3();

let active = 0;

function animate(t = 0){
    requestAnimationFrame(animate);

    const time = t % 9000;
    if (time < 3000) {
        sine_points_1(); // time controlled so need to be in animate()
        label.textContent = "Scene 1";
        active = scene1;
        // renderer.render(scene1.scene, camera);
    }

    else if (time < 6000) {
        sine_points_2();
        label.textContent = "Scene 2";
        active = scene2;
        // renderer.render(scene2.scene, camera);
    }

    else {
        sine_points_3();
        label.textContent = "Scene 3";
        active = scene3;
    }
    renderer.render(active.scene, camera);
    // controls.update(); // disabled the camera manipulation
}
animate();