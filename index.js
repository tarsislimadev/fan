import * as THREE from 'three';

// Setup scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 100);
camera.position.set(0, 2, 6);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
document.body.style.margin = '0px'

// Fan parameters
const fanPos = new THREE.Vector3(0, 0, 0);
const axis = new THREE.Vector3(0, 0, 1); // Fan blowing along +Z
const swirlStrength = 1.2;  // tangential component
const axialStrength = 3.0;  // forward component
const falloff = 0.6;        // decrease with distance

// Particle instancing
const COUNT = 5000;
const geom = new THREE.SphereGeometry(0.02, 6, 6);
const mat = new THREE.MeshBasicMaterial({ color: 0x66ccff });
const particles = new THREE.InstancedMesh(geom, mat, COUNT);
scene.add(particles);

const positions = new Float32Array(COUNT * 3);
for (let i = 0; i < COUNT; i++) {
  // Spawn in a disk in front of the fan
  const r = Math.random() * 1.0;
  const theta = Math.random() * Math.PI * 2;
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  const z = Math.random() * 0.5 - 0.2;
  positions[i*3+0] = x;
  positions[i*3+1] = y;
  positions[i*3+2] = z;
  const m = new THREE.Matrix4().setPosition(x, y, z);
  particles.setMatrixAt(i, m);
}
particles.instanceMatrix.needsUpdate = true;

// Velocity field: axial push + swirl around axis, with distance falloff
function velocityAt(p) {
  const rel = p.clone().sub(fanPos);
  // Axial (along +Z)
  const axial = axis.clone().multiplyScalar(axialStrength);

  // Swirl: perpendicular to radial vector in XY plane
  const radial = new THREE.Vector3(rel.x, rel.y, 0);
  const perp = new THREE.Vector3(-radial.y, radial.x, 0).normalize().multiplyScalar(swirlStrength);

  // Distance-based falloff
  const d = rel.length();
  const attenuation = 1.0 / (1.0 + falloff * d * d);

  return axial.add(perp).multiplyScalar(attenuation);
}

const tmp = new THREE.Object3D();
function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < COUNT; i++) {
    const idx = i * 3;
    const p = new THREE.Vector3(positions[idx+0], positions[idx+1], positions[idx+2]);
    const v = velocityAt(p);
    p.addScaledVector(v, 0.016); // dt ~ 16 ms

    // recycle if out of bounds
    if (p.z > 6 || p.length() > 5) {
      const r = Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      p.set(r * Math.cos(theta), r * Math.sin(theta), Math.random() * 0.5 - 0.2);
    }

    positions[idx+0] = p.x;
    positions[idx+1] = p.y;
    positions[idx+2] = p.z;
    tmp.position.copy(p);
    tmp.updateMatrix();
    particles.setMatrixAt(i, tmp.matrix);
  }
  particles.instanceMatrix.needsUpdate = true;

  renderer.render(scene, camera);
}
animate();
