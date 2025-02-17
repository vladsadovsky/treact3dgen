import { useRef, useEffect } from 'react';
import * as THREE from 'three';
// Import the wasm initialization and computation function from the generated pkg folder.
// (Make sure to run wasm-pack and place the output in src/pkg)
import init, { compute_coordinates } from '../rust-wasm/pkg/my_wasm_module';

const ThreeCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let frame = 0;
    let scene, camera, renderer;
    let objects = [];

    const initScene = async () => {
      // Initialize the WASM module.
      await init();

      // Set up the Three.js scene.
      scene = new THREE.Scene();
      // Set the background color to black
      scene.background = new THREE.Color(0x000000); // or new THREE.Color('black')

      const gridHelper = new THREE.GridHelper(10, 10);
      scene.add(gridHelper);

      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      renderer = new THREE.WebGLRenderer({ antialias: true });
      //renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
    
      renderer.setClearColor(0x202020);

      // use ref as a mount point of the Three.js scene instead of the document.body
      mountRef.current && mountRef.current.appendChild(renderer.domElement);

      // Add a cube to the scene.
      
      var geometry = new THREE.BoxGeometry(1, 1, 1);
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      camera.position.z = 5;

      animate();
      
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Remove previous frame objects.
      objects.forEach(obj => scene.remove(obj));
      objects = [];

      // Get new coordinates from the Rust computation component.
      const points = compute_coordinates(frame);

      // Create a small sphere for each point.
      points.forEach(point => {
        const geometry = new THREE.SphereGeometry(0.6);
        const material = new THREE.MeshBasicMaterial({ color: point.color });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(point.x, point.y, point.z);
        scene.add(sphere);
        objects.push(sphere);
      });

      renderer.render(scene, camera);
      frame++;
    };

    initScene();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeCanvas;
