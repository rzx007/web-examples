export class Particle {
  x: number;
  y: number;
  vx: number;
  w: number;
  h: number;
  ctx: CanvasRenderingContext2D;
  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.w = width;
    this.h = height;
    this.ctx = ctx;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = Math.random();
  }
  update(direction = 'right') {
    switch (direction) {
      case 'right':
        this.x += this.vx * 3;
        if (this.x > this.w) this.x = 0;
        break;
      case 'left':
        this.x -= this.vx * 3;
        if (this.x < 0) this.x = this.w;
        break;
      case 'up':
        this.y -= this.vx * 3;
        if (this.y < 0) this.y = this.h;
        break;
      case 'down':
        this.y += this.vx * 3;
        if (this.y > this.h) this.y = 0;
        break;
      case 'around':
        let deg = Math.atan2(
          this.y - this.h / 2,
          this.x - this.w / 2
        );
        let r = Math.sqrt(
          Math.pow(this.x - this.w / 2, 2) + Math.pow(this.y - this.h / 2, 2)
        )
        this.x = r * Math.cos(deg + this.vx / 200) + this.w / 2;
        this.y = r * Math.sin(deg + this.vx / 200) + this.h / 2;
        break;
    }

  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1 + this.vx, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.vx})`;
    this.ctx.fill();
  }
}