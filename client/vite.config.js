import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
//import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  /*server: {
    https: true
  },*/
  plugins: [react() /*, mkcert()*/ ], //comment the mkcert code to run port on ngrok
})