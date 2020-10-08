class RemoveCommentsPlugin {
  apply (compiler) {
    console.log('RemoveCommentsPlugin 启动了')
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      for (let name in compilation.assets) {
        console.log(name)
      }
    })
  }
}

module.exports = RemoveCommentsPlugin