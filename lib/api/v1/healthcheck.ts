import { NextFunction, Request, Response } from "express"
import * as Joi from "joi"
import { requestTypes } from "./../../route-boiler/IRoute.interface"
import { IRouteConfig } from "./../../route-boiler/IRoute.interface"

import { createDebugger } from "../../route-boiler/utils/debug"
const debug = createDebugger(__filename)

const routeConfig: IRouteConfig = {
  method: requestTypes.POST,
  schema: {
    body: {
      test: Joi.string().required()
    }
  },
  middlewares: [
    (req: Request, res: Response, next: NextFunction) => {
      debug(`post healthcheck endpoint called`)
      next()
    }
  ],
  handler: async (req: Request, res: Response) => {
    res.status(200).json({
      api_version: `v1`,
      endpoint_name: `health-check`,
      app_name: `Route-boiler`
    })
  }
}

export default routeConfig
