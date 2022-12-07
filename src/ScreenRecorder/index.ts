let recorder: MediaRecorder
document.getElementById('btn_start')?.addEventListener('click', async () => {
  let tracks: MediaStreamTrack[] = []
  const videoStream: MediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
  let audioStream: MediaStream
  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    audioStream.getAudioTracks().forEach(t => tracks.push(t))
  } catch (error) {
    console.warn('不支持麦克风设备, 将无法录制音频')
  }

  videoStream.getVideoTracks().forEach(t => tracks.push(t))
  const stream = new MediaStream(tracks)
  // const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
  recorder = new MediaRecorder(stream);
  const data: Blob[] = []
  recorder.ondataavailable = (e: BlobEvent) => {
    data.push(e.data)
  }
  recorder.onstop = () => {
    stream.getTracks().forEach(track => track.stop())
    const blob = new Blob(data, { type: recorder.mimeType })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = new Date().getTime() + '.webm'
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    link.remove()
  }
  recorder.start()
})
document.getElementById('btn_end')?.addEventListener('click', () => {
  recorder.stop()
})
