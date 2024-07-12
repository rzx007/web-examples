const audioEle = document.querySelector('audio') as HTMLAudioElement;
const cvs = document.querySelector('canvas') as HTMLCanvasElement;
const ctx = cvs.getContext('2d') as CanvasRenderingContext2D;
function initCvs() {
  cvs.width = window.innerWidth * devicePixelRatio;
  cvs.height = (window.innerHeight / 2) * devicePixelRatio;
}
initCvs()

let isInit = false
let dataArray: Uint8Array
let analyser: AnalyserNode
// 监听播放
audioEle.onplay = () => {
  if (isInit) {
    return
  }
  // 初始化
  const audCtx = new AudioContext(); // 创建音频上下文
  const source = audCtx.createMediaElementSource(audioEle); // 创建音频源节点
  analyser = audCtx.createAnalyser(); // 创建分析节点
  analyser.fftSize = 512;
  // 创建一个Uint8Array数组，用于存储分析数据
   dataArray = new Uint8Array(analyser.frequencyBinCount);
  source.connect(analyser); // 将音频源节点连接到分析节点
  analyser.connect(audCtx.destination); // 将分析节点连接到音频上下文的输出节点
  isInit = true
 
};
audioEle.onended = () => {
  isInit = false
}

//吧分析出来的波形绘制到画布上
function draw() {
  requestAnimationFrame(draw);
  // 清空画布
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  if (!isInit) {
    return
  }
  // 获取分析数据, 添加到dataArray中
  analyser.getByteFrequencyData(dataArray);
  console.log(dataArray);
  // 绘制成柱状图
  const len = dataArray.length / 2.5; // 选择高频
  const barWidth = cvs.width / len;
  ctx.fillStyle = 'rgb(0, 255, 0)';
  for (let i = 0; i < len; i++) {
    const data = dataArray[i]; // <256
    const barHeight = data / 255 * cvs.height;
    ctx.fillRect(i * barWidth, cvs.height - barHeight, barWidth, barHeight);
  }
  
}
// draw()
