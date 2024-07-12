// 请求接口的时候请求大小达到了几兆，如果js正常请求会导致等待时间过长，用户体验感就很很差。
// 我们采用分段去读js的响应体，读到一段就给用户展示，减少等待时间。
async function loadNovel() {
  const url = 'https://duyi-static.oss-cn-beijing.aliyuncs.com/files/novel.txt';
  const resp = await fetch(url);
  const reader = resp.body?.getReader();
  const decoder = new TextDecoder();
  let remainChunk = new Uint8Array(0);
  for (;;) { // 死循环
    const { value, done } = await reader!.read();
    if (done) {
      break;
    }
    const lastIndex = value.lastIndexOf(10);
    const chunk = value.slice(0, lastIndex + 1);
    const readChunk = new Uint8Array(remainChunk.length + chunk.length);
    readChunk.set(remainChunk);
    readChunk.set(chunk, remainChunk.length);
    remainChunk = value.slice(lastIndex + 1);
    const text = decoder.decode(readChunk);
    document.body.innerText = text
  }
  const text = decoder.decode(remainChunk);
  console.log(text);
}

loadNovel()

