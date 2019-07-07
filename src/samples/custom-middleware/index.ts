import { getAppInstance } from "../helper"
import DynamicRouter from "../../index"

async function setupRoutes() {
    const router = await DynamicRouter({
        baseDir: __dirname
    })

    return router
}

export default async function setup() {
    const app = getAppInstance()

    const router = await setupRoutes()
    app.use(router)

    return app
}
