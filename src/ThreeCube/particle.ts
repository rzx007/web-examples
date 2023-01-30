// 例子效果
import App from ".";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// 导入轨道模型控制器
import { Group } from "three/src/objects/Group";
import { AmbientLight } from "three/src/lights/AmbientLight";
import { SpotLight } from "three/src/lights/SpotLight";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import * as THREE from "three";

export class Model {
  loader!: GLTFLoader;
  basePath!: string;
  model!: Group
  animate = () => { }
}
export type GLTFLoadParameters = {
  basePath?: string;
  animateSwitch?: boolean
}
export default class ParticleModel extends Model {
  particlesModel!: THREE.Points
  // 创建1000个粒子
  particleCount = 1000;
  pMaterial = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
    side: THREE.DoubleSide, vertexColors: true, transparent: true
  });
  generateParticles() {
    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();
    for (var i = 0; i < this.particleCount; i++) {
      var vertex = new THREE.Vector3();
      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      positions.push(vertex.x, vertex.y, vertex.z);
      var color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55);
      colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geometry
  }
  // 加载器
  async setModel() {
    const geometry = this.generateParticles();
    let model = new THREE.Mesh(geometry, this.pMaterial);
    // model.scale.set( 300, 300, 300 );
    const groups = new Group()
    const spotLight = new DirectionalLight(0xffffff, .5)
    spotLight.position.set(0, 10, 0)
    const ambientLight = new SpotLight(0xffffff)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 50, 0);
    groups.add(hemiLight);
    groups.add(spotLight)
    groups.add(model)
    groups.position.y = 1.5
    this.model = groups
  }
  animate = () => {


  }
  constructor(props: GLTFLoadParameters) {

    super()

    this.basePath = props.basePath || ""

    this.loader = new GLTFLoader()

    this.setModel()

  }
}

// 实例化
const app = new App()
// 设置相机位置
// app.scene.background = new THREE.Color(0xffffff)
app.camera.position.y = 5

const gltfModel = new ParticleModel({ basePath: "/" })

app.addModel(gltfModel)
