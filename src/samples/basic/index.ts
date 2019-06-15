import * as express from "express"
import routeBoiler from "../../index"

import { getHandler } from "./routes/basic"

async function setupRoutes() {
    const router = await routeBoiler()

    router.get("/basic", getHandler)

    return router
}

export default async function setup() {
    const app = express()

    const router = await setupRoutes()
    app.use(router)

    return app
}
