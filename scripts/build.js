import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { name, version } from '../package.json'

const mergeConfig = config => {
  return {
    format: 'umd',
    name: name.toUpperCase(),
    banner: `/* version: ${version} */`,
    ...config
  }
}

export default {
  input: 'src/index.ts',
  output: [
    mergeConfig({ file: `lib/${name}.js` }),
    mergeConfig({
      file: `lib/${name}.min.js`,
      plugins: [terser({
        output: {
          comments: (node, comment) => {
            return /version/.test(comment.value)
          }
        }
      })]
    })
  ],
  plugins: [typescript()]
}