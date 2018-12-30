import routeBoiler from "./route-boiler"
export default routeBoiler

import { json } from "body-parser"
import * as express from "express"
import http = require("http")

/* tslint:disable:no-var-requires */
const validate = require("express-validation")

async function setup() {
  const app = express()

  app.use(json())
  app.use(await routeBoiler())

  app.use((req, res, next) => {
    if (!req.route) {
      return next(new Error("404"))
    }
    next()
  })

  app.use((err: any, req: any, res: any, next: any) => {
    // specific for validation errors
    if (err instanceof validate.ValidationError) {
      return res.status(err.status).json(err)
    }

    // other type of errors, it *might* also be a Runtime Error
    // example handling
    if (process.env.NODE_ENV !== "production") {
      return res.status(500).send({
        stack: err.stack,
        message: err.message
      })
    } else {
      return res.status(500)
    }
  })

  // app.use((err: any, req: any, res: any, next: any) => {
  //   res.send(err.message)
  // })

  const server = http.createServer(app)
  server.listen(5000, `0.0.0.0`, () => {
    console.log(`app listening on 5000`)
  })
}

setup()
