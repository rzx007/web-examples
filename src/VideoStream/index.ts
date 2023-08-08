document.getElementById('btn_start')?.addEventListener('click', async () => {
  const video = document.getElementById('videos') as HTMLVideoElement
  const videoStream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  video.srcObject = videoStream
})
document.getElementById('btn_end')?.addEventListener('click', () => {})
