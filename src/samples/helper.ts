import { json } from "body-parser"
import * as express from "express"

export function getAppInstance() {
    const app = express()

    app.use(json())

    return app
}
