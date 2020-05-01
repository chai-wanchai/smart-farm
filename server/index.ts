import app from './app'
import express from 'express'
const handle = app.getRequestHandler()
const port = parseInt(process.env.PORT || '5000', 10)
const renderPage = (req, res, pagePath, queryParams?) => app
  .render(req, res, pagePath, queryParams)
  .catch(err => app.renderError(err, req, res, pagePath, queryParams))
  
app.prepare().then(() => {

  // Create express server
  const server = express()
  server.all('*', (req, res) => handle(req, res))
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}