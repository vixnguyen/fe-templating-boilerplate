// const fs = require('fs')
// const handlebars = require('handlebars')

// handlebars.registerPartial('header', fs.readFileSync('./src/views/partials/header.hbs', 'utf8'))
// handlebars.registerPartial('header2', fs.readFileSync('./src/views/partials/header.2.hbs', 'utf8'))
// handlebars.registerPartial('menu', fs.readFileSync('./src/views/partials/menu.hbs', 'utf8'))
// handlebars.registerPartial('footer', fs.readFileSync('./src/views/partials/footer.hbs', 'utf8'))
// handlebars.registerPartial('sidebar', fs.readFileSync('./src/views/partials/sidebar.hbs', 'utf8'))
// handlebars.registerPartial('breadcrumbs', fs.readFileSync('./src/views/partials/breadcrumbs.hbs', 'utf8'))
// handlebars.registerPartial('dialog', fs.readFileSync('./src/views/partials/dialog.hbs', 'utf8'))

// module.exports = (name, context, options) => {
//   const htmlWebpackPluginOptions = context.data.root.htmlWebpackPlugin.options

//   handlebars.registerHelper('active-route', (name, context) => {
//     return name === htmlWebpackPluginOptions.filename ? 'active' : ''
//   })
//   handlebars.registerHelper('loop', (n, block) => {
//     var accum = ''
//     for (var i = 0; i < n; ++i) {
//       accum += block.fn(i)
//     }
//     return accum
//   })

//   const layout = handlebars.compile(fs.readFileSync(`./src/views/${name}.hbs`, 'utf8'))

//   return layout({
//     data: htmlWebpackPluginOptions.data,
//     title: htmlWebpackPluginOptions.title,
//     body: context.fn(this)
//   })
// }
const assemble = require('assemble')
const loaderUtils = require('loader-utils')
const app = assemble()

function assembleLoader(content) {
  this.cacheable && this.cacheable()
  const callback = this.async()

  const options = loaderUtils.getOptions(this) || {}

  if (!options.layouts) {
    throw new Error('need to config layouts')
  }
  if (!options.partials) {
    throw new Error('need to config partials')
  }

  console.log(this.data)
  console.log(loaderUtils.getCurrentRequest(this))
  console.log(loaderUtils)
  // console.log(this.name)
  // console.log(this.options)
  // console.log(loaderUtils)

  app.layouts(options.layouts)
  app.partials(options.partials)
  app.data(require(options.data))
  app.page('page.hbs', { content })

  app.render('page.hbs', options.define || {}, (err, view, name) => {
    console.log(view, name);
    if (err) {
      throw new Error(err.message)
    }
    callback(null, view.content)
  })
}
module.exports = assembleLoader
