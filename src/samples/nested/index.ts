import * as express from "express"
import routeBoiler from "../../index"

async function setupRoutes() {
    const router = await routeBoiler({
        baseDir: __dirname
    })

    return router
}

export default async function setup() {
    const app = express()

    const router = await setupRoutes()
    app.use(router)

    return app
}
