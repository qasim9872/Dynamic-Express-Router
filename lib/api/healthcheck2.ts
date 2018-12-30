import { Request, Response } from "express"
import { requestTypes } from "route-boiler/IRoute.interface"

export default {
  method: requestTypes.GET,
  schema: {},
  middlewares: [],
  handler: async (req: Request, res: Response) => {
    res.status(200).json({
      api_version: `v1`,
      endpoint_name: `health-check2`,
      app_name: `Route-boiler`
    })
  }
}
