import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    // jsxInject: "import { h } from 'vue';",
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  server: {
    port: 5173,
    host: true,
    proxy: {}
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    vueJsx({
      /* options are passed on to @vue/babel-plugin-jsx */
    })
  ]
})
