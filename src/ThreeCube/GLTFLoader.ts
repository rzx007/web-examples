/*
 * @Author: 阮志雄
 * @Date: 2023-01-30 09:42:08
 * @LastEditTime: 2023-01-30 16:47:44
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \web-examples\src\ThreeCube\GLTFLoader.ts
 */
import App from ".";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// 导入轨道模型控制器
import { Group } from "three/src/objects/Group";
import { AmbientLight } from "three/src/lights/AmbientLight";
import { SpotLight } from "three/src/lights/SpotLight";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import Cube, { BasicModel } from "./cube";
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
app.scene.background = new THREE.Color(0xffffff)
app.camera.position.y = 5
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