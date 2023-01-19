const app = require('./app')
const http = require('http');
const { info } = require('./utils/logger');
const config = require("./utils/config")

const server = http.createServer(app)

server.listen(config.PORT, () => {
  info(`listening on port ${config.PORT}`)
})
