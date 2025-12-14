import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as COLORS from './colors.js'

import dat from 'dat.gui'

const gui = new dat.GUI({ name: 'Fan' })

const addFolder = (name, mesh = new THREE.Mesh()) => {
  const folder = gui.addFolder(name)
  folder.add(mesh.position, 'x', -10, 10, 0.1).name('pos x')
  folder.add(mesh.position, 'y', -10, 10, 0.1).name('pos y')
  folder.add(mesh.position, 'z', -10, 10, 0.1).name('pos z')
  folder.add(mesh.rotation, 'x', -Math.PI, Math.PI, Math.PI * 0.1).name('rot x')
  folder.add(mesh.rotation, 'y', -Math.PI, Math.PI, Math.PI * 0.1).name('rot y')
  folder.add(mesh.rotation, 'z', -Math.PI, Math.PI, Math.PI * 0.1).name('rot z')
}

const width = () => window.innerWidth, height = () => window.innerHeight

const camera = new THREE.PerspectiveCamera(70, width() / height(), 0.01, 10)
camera.position.z = 1

const scene = new THREE.Scene()
const animations = []

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(width(), height())
renderer.setAnimationLoop((time) => {
  animations.map((fn) => fn(time))
  renderer.render(scene, camera)
})

const controls = new OrbitControls(camera, renderer.domElement)
animations.push(() => controls.update())

document.body.appendChild(renderer.domElement)

document.body.style.margin = '0px'

//

scene.add(new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 0.4, 32),
  new THREE.MeshBasicMaterial({ color: 0xcccccc }),
))

const cylinders = Array.from(Array(5)).map(() => {
  return new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, 0.2, 32),
    new THREE.MeshBasicMaterial({ color: 0xcccccc }),
  )
})

const group = new THREE.Group()
scene.add(group)

cylinders[1].rotation.z = 1 * Math.PI / 4
cylinders[2].rotation.z = 3 * Math.PI / 4
cylinders.map((c) => scene.add(c))

window.addEventListener('keyup', () => {
  console.log('camera.position', camera.position)
})
