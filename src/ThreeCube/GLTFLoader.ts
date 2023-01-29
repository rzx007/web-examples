import App from ".";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// 导入轨道模型控制器
import { Group } from "three/src/objects/Group";
import { AmbientLight } from "three/src/lights/AmbientLight";
import { SpotLight } from "three/src/lights/SpotLight";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import Cube, { BasicModel } from "./cube";

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
export default class GLTFLoad extends Model {
  // 加载器
  loader: GLTFLoader

  // 模型基础路径
  basePath: string

  async loadModel() {
    this.basePath && this.loader.setPath(this.basePath)
    return new Promise((resolve, reject) => {
      this.loader.load("萌三兄弟.gltf", (gltf: GLTF) => {
        console.log(gltf);
        gltf.scene.traverse( function ( child: any ) {
          if ( child.isMesh ) {
            child.material.emissive =  child.material.color;
            child.material.emissiveMap = child.material.map ;
          }
        });
        resolve(gltf.scene)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100% +'building model loaded');
      },
      error => { reject(error)}
      )
    })
  }

  async setModel() {
    const model = await this.loadModel() as Group
    const groups = new Group()
    const spotLight = new DirectionalLight(0xffffff)
    const ambientLight = new AmbientLight(0xffffff)
    groups.add(model)
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

// 实例化
const app = new App()
// 设置相机位置


// const cube: BasicModel = new Cube()

// app.addModel(cube)

const gltfModel = new GLTFLoad({ basePath: "/" })

app.addModel(gltfModel)

// app.camera.position.z = 10
// 或者
/**
 * const app = new App(new Cube())
 * app.camera.position.z = 5
 */