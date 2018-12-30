import { NextFunction, Request, Response } from "express"
import { ObjectSchema, Schema } from "joi"

type expressHandler = (req: Request, res: Response) => any
type expressMiddleware = (req: Request, res: Response, next: NextFunction) => any

export interface IJoiSchema {
  // Update this when adding schema for any of "body" | "params" | "query" | "headers" | "cookies"
  body?:
    | {
        [key: string]: Schema
      }
    | ObjectSchema
}

export const enum requestTypes {
  GET = "get",
  POST = "post"
}

export interface IRouteConfig {
  name?: string
  method: requestTypes
  schema?: IJoiSchema
  middlewares: expressMiddleware[]
  handler: expressHandler
}

export interface IRoute {
  name: string
  requestType: requestTypes
  handler: expressHandler
  // validationSchema?: JoiSchema
}
