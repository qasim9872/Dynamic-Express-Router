jest.mock("../../route-boiler/utils/debug")

import { Express } from "express"
import { Response } from "supertest"
import routeBoiler from "../../route-boiler/index"
import { getAppInstance, getServerInstance } from "../helper/app.helper"

describe(`routeBoiler setup with no middlewares`, () => {
  let app: Express

  beforeAll(async (done) => {
    app = getAppInstance()

    const router = await routeBoiler({
      baseDir: __dirname,
      middlewares: false
    })

    // app.use(router)

    done()
  })

  const route = "/basic"
  it(`should dynamically load ${route} route`, async (done) => {
    const server = getServerInstance(app)

    server.get(route).expect(200, async (err: any, res: Response) => {
      done(res)
    })
  })
})
