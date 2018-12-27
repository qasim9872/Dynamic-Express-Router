import { Request, Response } from "express"

export default async function(req: Request, res: Response) {
  res.status(200).json({
    api_version: `v1`,
    endpoint_name: `health-check1`,
    app_name: `Route-boiler`,
  })
}
