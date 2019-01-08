import { NextFunction, Request, RequestHandler, Response } from "express"
import { requestTypes } from "../../route-boiler/IRoute.interface"
import IRoute from "./../../route-boiler/IRoute"

export default class Route extends IRoute {
  public method() {
    return requestTypes.GET
  }

  public middlewares() {
    return [
      async (req: Request, res: Response, next: NextFunction) => {
        console.log(`test route`)
        next()
      }
    ]
  }

  public handler(req: Request, res: Response) {
    res.status(200).json({
      api_version: `v1`,
      endpoint_name: `health-check2`,
      app_name: `Route-boiler`
    })
  }

  // public validationSchema = () =>
}
