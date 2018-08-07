# HTML Boilerplate

> Frontend HTML boilerplate based on Webpack for assets management, and Handlebars as webpack html template engine. Useful for quick interactive mockup development, easily transposable to any Backend Framework.

## Frontend features

* Frontend(HTML) boilerplate with basic home-category pages
* Handlebars
* Vue.js
* SASS
* Bootstrap 4
* Font Awesome
* Others


Just as easy !
Web site should be accessible from localhost:3000.
Port is configurable by `.env` file settings (just copy `.env.example`).

## Development

### Commands
* `npm install` to install dependences

* `npm run dev`
Start Webpack assets compilation and express server with hot reloading support.

* `npm run build`
Compile all JS application into redistributable static files into `dist` folder.

### Project Structure

#### Src
The main folder for development progress
* `assets` for stylesheet and static file and you usually work on `stylesheet` folder, you can actually replace codes inside this folder by other what you think better.
* `data` is a folder that declaring data what use in the template to avoid hard code, duplicate and more utilities.
* `routing` is a folder that defining pages on your project
* `task` is a folder that creates some task and loader for the build time
* `views` is a folder contained your template, it includes the main sections such as `layout`, `pages` and `partials`, you must comply with this structure to make sure your code works well.

#### Configurations
`webpack.config.js` ...

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
