import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



//
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers:[
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ]
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  server:{
    // open: '/index.html',
    // host:'localhost',
    port:'8000',
    // proxy:{
    //   "/api":{
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     rewrite: path => path.replace(RegExp(`^api`), '')
    //   },
    // }
  },
})
