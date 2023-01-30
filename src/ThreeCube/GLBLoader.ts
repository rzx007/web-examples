import App from ".";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
// 导入轨道模型控制器
import { Group } from "three/src/objects/Group";
import { AmbientLight } from "three/src/lights/AmbientLight";
import { SpotLight } from "three/src/lights/SpotLight";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import * as THREE from 'three'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

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
let INTERSECTED: any;
class GLBModel extends Model {
  // 加载器
  loader: GLTFLoader

  // 模型基础路径
  basePath: string

  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2()

  onPointerMove(event: PointerEvent) {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;


  }
  onIntersects() {

    // 通过摄像机和鼠标位置更新射线
    this.raycaster.setFromCamera(this.pointer, app.camera);

    // 计算物体和射线的焦点
    const intersects = this.raycaster.intersectObjects(app.scene.children);

    // for (let i = 0; i < intersects.length; i++) {
    //   // @ts-ignore
    //   intersects[i].object.material.color.set(0xff0000);
    // }
    // 设置color
    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].object) {
        if (INTERSECTED) INTERSECTED.material.color.set(0xffffff);
        INTERSECTED = intersects[0].object;
        INTERSECTED.material.color.set(0xff0000);
      }
    } else {
      if (INTERSECTED) INTERSECTED.material.color.set(0xffffff);
      INTERSECTED = null;
    }
  }

  async loadModel() {
    this.basePath && this.loader.setPath(this.basePath)
    return new Promise((resolve, reject) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');
      this.loader.setDRACOLoader(dracoLoader);
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
    spotLight.position.set(0, 10, 0)
    const ambientLight = new SpotLight(0xffffff)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 50, 0);
    groups.add(hemiLight);
    groups.add(spotLight)
    groups.add(gltf.scene)
    this.model = groups
  }
  animate = () => {
    // this.model.position.z += 0.1
    this.onIntersects()

  }
  constructor(props: GLTFLoadParameters) {

    super()

    this.basePath = props.basePath || ""

    this.loader = new GLTFLoader()

    this.setModel()

    window.addEventListener('pointermove', (event) => this.onPointerMove(event));

  }
}

// 创建
const app = new App()
app.scene.background = new THREE.Color(0xffffff)
app.camera.position.set(10, 20, 10)

const glbModel = new GLBModel({ basePath: "/" })

app.addModel(glbModel)


// https://blog.csdn.net/ithanmang/article/details/80897888
// https://www.bbsmax.com/A/D854Y6RpdE/