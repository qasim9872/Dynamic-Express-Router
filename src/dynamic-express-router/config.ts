// eslint-disable-next-line
const { merge } = require("merge-json")

export interface UserConfig {
    baseDir: string
    middlewares?: string
    routes?: string
    fileExtensions?: string[]
    filters?: RegExp[]
}

export interface Config extends UserConfig {
    middlewares: string
    routes: string
    fileExtensions: string[]
    filters: RegExp[]
}

function getDefaultConfig(): Config {
    return {
        baseDir: process.cwd(),
        middlewares: "./middlewares",
        routes: "./routes",
        fileExtensions: [".ts", ".js"],
        filters: [/\.d\.ts$/]
    }
}

export function getConfig(config: UserConfig): Config {
    return merge(getDefaultConfig(), config)
}
