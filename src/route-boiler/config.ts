const { merge } = require("merge-json")

export interface config {
    baseDir: string
    middlewares?: string
    routes?: string
    fileExtensions?: string[]
}

function getDefaultConfig(): config {
    return {
        baseDir: process.cwd(),
        middlewares: "./middlewares",
        routes: "./routes",
        fileExtensions: [".ts", ".js"]
    }
}

export function getConfig(config: config) {
    return merge(getDefaultConfig(), config)
}
