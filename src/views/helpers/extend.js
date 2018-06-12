const fs = require('fs')
const handlebars = require('handlebars')

handlebars.registerPartial('header', fs.readFileSync('./src/views/partials/header.hbs', 'utf8'))
handlebars.registerPartial('footer', fs.readFileSync('./src/views/partials/footer.hbs', 'utf8'))

module.exports = (name, context, options) => {
  const htmlWebpackPluginOptions = context.data.root.htmlWebpackPlugin.options

  handlebars.registerHelper('active-route', (name, context) => {
    return name === htmlWebpackPluginOptions.filename ? 'active' : ''
  })

  const layout = handlebars.compile(fs.readFileSync(`./src/views/${name}.hbs`, 'utf8'))

  return layout({
    title: htmlWebpackPluginOptions.title,
    body: context.fn(this)
  })
}
