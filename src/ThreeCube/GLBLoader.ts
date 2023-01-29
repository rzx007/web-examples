import App from ".";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// 导入轨道模型控制器
import { Group } from "three/src/objects/Group";
import { AmbientLight } from "three/src/lights/AmbientLight";
import { SpotLight } from "three/src/lights/SpotLight";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import * as THREE from 'three'

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
class GLBModel extends Model {
  // 加载器
  loader: GLTFLoader

  // 模型基础路径
  basePath: string

  async loadModel() {
    this.basePath && this.loader.setPath(this.basePath)
    return new Promise((resolve, reject) => {
      this.loader.load("战机16.gltf", (gltf: GLTF) => {
        console.log(gltf);
        resolve(gltf)
      },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 % +'building model loaded');
        },
        error => { reject(error) }
      )
    })
  }

  async setModel() {
    const gltf: GLTF = await this.loadModel() as GLTF
    // const mixer = new THREE.AnimationMixer(gltf.scene)
    // mixer.clipAction(gltf.animations[0]).play()
    const groups = new Group()
    const spotLight = new DirectionalLight(0xffffff)
    spotLight.position.set(0, 0, 10)
    const ambientLight = new AmbientLight(0xffffff)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    groups.add(hemiLight);
    groups.add(gltf.scene)
    groups.add(spotLight)
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

// 创建
const app = new App()
app.scene.background = new THREE.Color(0xffffff)
app.camera.position.set(10, 20, 50)

const glbModel = new GLBModel({ basePath: "/" })

app.addModel(glbModel)
// https://www.bbsmax.com/A/D854Y6RpdE/