import * as THREE from 'three'

const width = () => window.innerWidth
const height = () => window.innerHeight

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

document.body.appendChild(renderer.domElement)
document.body.style.margin = '0px'

//

scene.add(new THREE.Mesh(
  new THREE.CylinderGeometry(0.01, 0.01, 0.4, 32),
  new THREE.MeshBasicMaterial({ color: 0xcccccc }),
))

const cylinders = Array.from(Array(5)).map((_, ix) => {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(+0.01, +0.01, +0.4, +32.0),
    new THREE.MeshBasicMaterial({ color: 0xcccccc }),
  )
  mesh.rotation.z += Math.PI * 0.2 * ix

  const group = new THREE.Group()
  group.position.y += 0.2
  group.add(mesh)

  return [group, mesh]
})

const group = new THREE.Group()
scene.add(group)

cylinders.map((c) => scene.add(c[0]))

setInterval(() =>
  cylinders.map((c) =>
    c[0].rotation.z -= 0.01
  ),
  1
)

window.addEventListener('keyup', () => {
  console.log('camera.position', camera.position)
})
