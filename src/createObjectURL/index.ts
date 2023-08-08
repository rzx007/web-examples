(document.querySelector('#file') as HTMLInputElement)!.onchange = function (e) {
  const file = (e.target as HTMLInputElement).files[0]

  const URL1 = URL.createObjectURL(file)
  console.log(URL1)
  document.querySelector('#img1')!.src = URL1
  // URL.revokeObjectURL(URL1) // 释放内存
}