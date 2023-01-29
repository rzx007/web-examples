import './style.css'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <a href="/pages/starry-sky.html">
        <button type="button">canvas星星</button>
      </a>
      <a href="/pages/three/index.html">
        <button type="button">THREE-3D</button>
      </a>
      <a href="/pages/screen-recorder.html">
        <button type="button">屏幕录像</button>
      </a>
      <a href="/pages/shard-request-data.html">
      <button type="button">分片请求数据</button>
    </a>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
