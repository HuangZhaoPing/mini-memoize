const Bundler = require('parcel-bundler')
const Path = require('path')

const entryFiles = Path.join(__dirname, '..', 'public/index.html')

const options = {
  outDir: './example',
  outFile: 'index.html',
  publicUrl: '/',
  cache: false
}

const bundler = new Bundler(entryFiles, options)

bundler.serve()
