import * as THREE from 'three';
import { useEffect, useRef } from "react";
// Import the wasm initialization and computation function from the generated pkg folder.
// (Make sure to run wasm-pack and place the output in src/pkg)
import init, { compute_coordinates } from '../rust-wasm/pkg/my_wasm_module';

function ThreeCanvas() {
  const refContainer = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let frame = 0;
    let scene, camera, renderer;
    let objects = [];
  
    init(); // Initialize the WASM module

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 
      refContainer.current.clientWidth / refContainer.current.clientHeight,
      0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild( renderer.domElement );
   
    // Set the background color to black
    scene.background = new THREE.Color(0x000000); // or new THREE.Color('black')

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

  
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return (
    <div ref={refContainer}></div>

  );
}

export default ThreeCanvas

