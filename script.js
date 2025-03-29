import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}
window.showSidebar = showSidebar;
window.closeSidebar = closeSidebar;

// https://discourse.threejs.org/t/particle-wave-code/67327
// Attempting to recreate the PS3 waves

if (WebGL.isWebGL2Available()) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("white");

  const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight);
  camera.position.set(0, 1 / 4, 6);
  camera.lookAt(scene.position);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setAnimationLoop(animationLoop);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", (event) => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  var geometry = new THREE.PlaneGeometry(10, 4, 250, 100),
    pos = geometry.getAttribute("position"),
    simplex = new SimplexNoise();

  var waves = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: 0x000000,
      wireframe: true,
    })
  );

  waves.rotation.x = -Math.PI / 2;
  waves.position.y = 0.6;
  scene.add(waves);

  function animationLoop(t) {
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const wave = Math.sin((x + t / 20000) * 2) * 0.15;
      const noise = 0.5 * simplex.noise3d(x / 2, y / 5, t / 50000);

      pos.setZ(i, wave + noise);
    }

    pos.needsUpdate = true;
    renderer.render(scene, camera);
  }
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.body.appendChild(warning);
}
