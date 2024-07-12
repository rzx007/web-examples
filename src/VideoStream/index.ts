document.getElementById('btn_start')?.addEventListener('click', async () => {
  const video = document.getElementById('videos') as HTMLVideoElement
  video.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
})
document.getElementById('btn_end')?.addEventListener('click', () => {})
