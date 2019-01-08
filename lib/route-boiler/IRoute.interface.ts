import { RequestHandler } from "express"
import { ObjectSchema, Schema } from "joi"

export interface IJoiSchema {
  // Update this when adding schema for any of "body" | "params" | "query" | "headers" | "cookies"
  body?:
    | {
        [key: string]: Schema
      }
    | ObjectSchema
}

export enum requestTypes {
  GET = "get",
  POST = "post"
}

export interface IRouteConfig {
  name?: string
  method: requestTypes
  schema?: IJoiSchema
  middlewares: RequestHandler[]
  handler: RequestHandler
}

// export interface IRoute {
//   name: string
//   requestType: requestTypes
//   handler: expressHandler
//   // validationSchema?: JoiSchema
// }
