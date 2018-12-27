import routeBoiler from "./route-boiler"
export default routeBoiler

import http = require("http")
import * as express from "express"

async function setup() {
  const app = express()

  app.use(await routeBoiler())

  app.use(function(req, res, next) {
    if (!req.route) return next(new Error("404"))
    next()
  })

  app.use(function(err: any, req: any, res: any, next: any) {
    res.send(err.message)
  })

  const server = http.createServer(app)
  server.listen(5000, `0.0.0.0`, () => {
    console.log(`app listening on 5000`)
  })
}

setup()
