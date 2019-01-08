import { Request, RequestHandler, Response } from "express"
import { IJoiSchema, requestTypes } from "./IRoute.interface"

export default abstract class IRoute {
  public abstract method(): requestTypes
  public abstract middlewares(): RequestHandler[]
  public abstract handler(req: Request, res: Response): any

  /**
   * @description The function needs to be overridden to return custom schema
   */
  public validationSchema(): IJoiSchema {
    return {}
  }
}
