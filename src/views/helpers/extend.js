const fs = require('fs')
const handlebars = require('handlebars')

handlebars.registerPartial('header', fs.readFileSync('./src/views/partials/header.hbs', 'utf8'))
handlebars.registerPartial('header2', fs.readFileSync('./src/views/partials/header.2.hbs', 'utf8'))
handlebars.registerPartial('menu', fs.readFileSync('./src/views/partials/menu.hbs', 'utf8'))
handlebars.registerPartial('footer', fs.readFileSync('./src/views/partials/footer.hbs', 'utf8'))
handlebars.registerPartial('sidebar', fs.readFileSync('./src/views/partials/sidebar.hbs', 'utf8'))
handlebars.registerPartial('breadcrumbs', fs.readFileSync('./src/views/partials/breadcrumbs.hbs', 'utf8'))
handlebars.registerPartial('dialog', fs.readFileSync('./src/views/partials/dialog.hbs', 'utf8'))

module.exports = (name, context, options) => {
  const htmlWebpackPluginOptions = context.data.root.htmlWebpackPlugin.options

  handlebars.registerHelper('active-route', (name, context) => {
    return name === htmlWebpackPluginOptions.filename ? 'active' : ''
  })
  handlebars.registerHelper('loop', (n, block) => {
    var accum = ''
    for (var i = 0; i < n; ++i) {
      accum += block.fn(i)
    }
    return accum
  })

  const layout = handlebars.compile(fs.readFileSync(`./src/views/${name}.hbs`, 'utf8'))

  return layout({
    data: htmlWebpackPluginOptions.data,
    title: htmlWebpackPluginOptions.title,
    body: context.fn(this)
  })
}
