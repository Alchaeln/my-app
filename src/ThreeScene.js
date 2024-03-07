// ThreeScene.js
import React, { useEffect } from 'react';
import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ThreeScene = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('root').appendChild(renderer.domElement);

    //added point light
    const pointLight = new THREE.PointLight(0xFFFFFF, 1000);
    pointLight.position.set(15,10,5);
 
    //ambient flood light
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 100);
    scene.add(pointLight, ambientLight);

    // Replace BoxGeometry with SphereGeometry
    const geometry = new THREE.SphereGeometry(1, 32, 32); // radius, width segments, height segments
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleaned up Three.js scene on component unmount
    return () => {
      scene.remove(sphere);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <></>; // can also return null if not needed to render anything for this component
};

export default ThreeScene;

