/*
 * @Author: 阮志雄
 * @Date: 2022-12-07 22:55:05
 * @LastEditTime: 2022-12-07 22:55:07
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vite-canvas-demo\src\ThreeCube\cube.ts
 */
import * as THREE from 'three'

export class Model {
  geometry!: THREE.BufferGeometry;
  material!: THREE.Material;
  model!: THREE.Mesh
  animate = () => { }
}
export type ModelParameters = {
  geometry?: THREE.BoxGeometry;
  material?: THREE.Material;
  animateSwitch?: boolean
}
export default class Cube extends Model {
  // 创建几何体
  geometry: THREE.BoxGeometry

  // 创建材质
  material: THREE.Material

  // 完整的几何体
  model: THREE.Mesh

  // 是否动画
  animateSwitch: boolean

  animate = () => {
    if (this.animateSwitch) {
      this.model.rotation.x += 0.01
      this.model.rotation.y += 0.01
      this.model.rotation.z += 0.01
    }

  }

  constructor(props: ModelParameters = { animateSwitch: true }) {
    super()
    this.animateSwitch = !!props.animateSwitch
    this.geometry = props.geometry || new THREE.BoxGeometry(2, 2, 2)
    this.material = props.material || new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      wireframe: true
    })
    // 创建3D模型
    this.model = new THREE.Mesh(this.geometry, this.material)
  }
}