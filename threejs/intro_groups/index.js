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

// add scene
const scene = new THREE.Scene();

// add groups
const plot1 = new THREE.Group();
const plot2 = new THREE.Group();
const plot3 = new THREE.Group();

//// functions
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

const mat = new THREE.LineBasicMaterial({color: "white",}); // can be shared

// create line mesh
function createLines(){
    // javascript does pass individual numbers as reference but values, if want your x, points, line to change it has to be as an array
    // we need the x, points and line to draw the plot
    const state = {
        x:-10,
        points: [],
        line: new THREE.Line(new THREE.BufferGeometry().setFromPoints([]), mat) // this is API data can come. I am getting a headache
    }
    return state; // need all these for the plot
}

// create light source
function createLight(){
    const hemiLight = new THREE.HemisphereLight("Blue");
    return hemiLight;

}

// plot 1
function sine_points1(state){
    // state is an object, so its properties can be mutated inside functions
    if (state.x < grid_size/2){ // grid is from -grid_size/2 to +grid_size/2
        // compute the sine value 
        state.points.push(new THREE.Vector3(state.x, Math.sin(state.x), 0));
        // points.push(new THREE.Vector3(-Math.sin(x), x, 0));
        state.line.geometry.setFromPoints(state.points);

        state.x += 0.2; // controls the speed of the animation
    }
}
function createPlot1(){
    plot1.add(createGrids());
    const plotState = createLines();
    plot1.add(plotState.line);
    plot1.add(createLight());
    scene.add(plot1); // add the group to the scene
    return plotState;
}

function sine_points2(state){
    if (state.x < grid_size/2){ // grid is from -grid_size/2 to +grid_size/2
        // compute the sine value 
        // points_2.push(new THREE.Vector3(x2, Math.sin(x2), 0));
        state.points.push(new THREE.Vector3(-Math.sin(state.x), state.x, 0));
        state.line.geometry.setFromPoints(state.points);

        state.x += 0.2; // controls the speed of the animation
    }

}

function createPlot2(){
    plot2.add(createGrids());
    const plotState = createLines();
    plot2.add(plotState.line);
    plot2.add(createLight());
    scene.add(plot2); // add the group to the scene
    return plotState;
}

function sine_points3(state){
    if (state.x < grid_size/2){ // grid is from -grid_size/2 to +grid_size/2
        // compute the sine value 
        state.points.push(new THREE.Vector3(state.x, Math.sin(state.x), 0));
        state.points.push(new THREE.Vector3(Math.sin(state.x), state.x, 0));
        state.line.geometry.setFromPoints(state.points);

        state.x += 0.2; // controls the speed of the animation
    }
}

function createPlot3(){
    plot3.add(createGrids());
    const plotState = createLines();
    plot3.add(plotState.line);
    plot3.add(createLight());
    scene.add(plot3); // add the group to the scene
    return plotState;
}

const plot1State = createPlot1()
const plot2State = createPlot2()
const plot3State = createPlot3()



const label = document.getElementById("label");
function animate(t = 0){
    requestAnimationFrame(animate);
    const time = t % 9000; // helps loop back as this is th remainder
    if (time<3000){
        plot1.visible = true;
        plot2.visible = false;
        plot3.visible = false;
        sine_points1(plot1State);
        label.textContent = "Group 1";
    }
    else if (time < 6000) {
        plot1.visible = false; // hide the plot 1, this is why groups are useful
        plot2.visible = true;
        plot3.visible = false;
        sine_points2(plot2State);
        label.textContent = "Group 2";
    }
    else {
        plot1.visible = false;
        plot2.visible = false; // hide the plot 2, this is why groups are useful
        plot3.visible = true;
        sine_points3(plot3State);
        label.textContent = "Group 3";
    }
    renderer.render(scene, camera);
    // controls.update(); // disabled the camera manipulation
}
animate();