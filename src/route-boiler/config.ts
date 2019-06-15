// eslint-disable-next-line
const { merge } = require("merge-json")

export interface UserConfig {
    baseDir: string
    hasMiddlewareDir?: boolean
    middlewares?: string
    routes?: string
    fileExtensions?: string[]
}

export interface Config extends UserConfig {
    hasMiddlewareDir: boolean
    middlewares: string
    routes: string
    fileExtensions: string[]
}

function getDefaultConfig(): Config {
    return {
        baseDir: process.cwd(),
        hasMiddlewareDir: true,
        middlewares: "./middlewares",
        routes: "./routes",
        fileExtensions: [".ts", ".js"]
    }
}

export function getConfig(config: UserConfig): Config {
    return merge(getDefaultConfig(), config)
}
