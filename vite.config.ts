import {UserConfigExport, ConfigEnv } from 'vite'


export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    server: {
      host: '0.0.0.0',
      open: true,

    },
  }
}
