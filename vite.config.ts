import {UserConfigExport, ConfigEnv } from 'vite'


export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    server: {
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/puppeteer': {
          target: 'http://127.0.0.1:3456/puppeteer',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/puppeteer/, '')
        }
      }
    },
  }
}
