const assemble = require('assemble')
const loaderUtils = require('loader-utils')
const app = assemble()

module.exports = function(content) {
  this.cacheable && this.cacheable()
  const callback = this.async()

  const options = loaderUtils.getOptions(this) || {}

  if (!options.layouts) {
    throw new Error('need to config layouts')
  }
  if (!options.partials) {
    throw new Error('need to config partials')
  }

  app.layouts(options.layouts)
  app.partials(options.partials)
  app.data(options.data, { namespace: false })
  app.page('page.hbs', { content })

  app.render('page.hbs', options.define || {}, (err, view, name) => {
    if (err) {
      throw new Error(err.message)
    }
    callback(null, `module.exports = ${JSON.stringify(view.content)};`)
  })
}
