let recorder: MediaRecorder
document.getElementById('btn_start')?.addEventListener('click', () => {
  navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then((stream) => {
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
})
document.getElementById('btn_end')?.addEventListener('click', () => {
  recorder.stop()
})
