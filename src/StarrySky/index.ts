import { Particle } from './particle';
import './style.css'
export type Direction = 'right' | 'left' | 'up' | 'down' | 'around'
class StarrySky {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: Particle[];
  count: number;
  private direction?: Direction;
  constructor() {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.canvas.style.zIndex = '-1';
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    document.body.appendChild(this.canvas)
    this.particles = [];
    this.count = 1000;
    this.direction = 'right'
    this.animate();
  }
  set directions(direction: Direction ) {
    this.direction = direction
  }
  get directions() {
    return this.direction as Direction
  }
  draw() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (this.particles.length < this.count) {
      this.particles.push(
        new Particle(this.canvas.width, this.canvas.height, this.ctx)
      );
    }
    for (let i in this.particles) {
      const p = this.particles[i];
      p.update(this.direction);
      p.draw();
    }
  }
  animate() {
    requestAnimationFrame(() => this.animate())
    this.draw()
  }
}
const star = new StarrySky()
star.directions = 'down'
// 隔一段时间，随机更改方向
setInterval(() => {
  const directions = ['right', 'left', 'up', 'down', 'around']
  const random = Math.floor(Math.random() * 5)
  star.directions = directions[random] as Direction
}, 3000)
