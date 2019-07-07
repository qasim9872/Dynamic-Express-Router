export interface UserConfig {
    baseDir: string
    middlewares?: string
    routes?: string
    fileExtensions?: string[]
    filters?: RegExp[]
    generateRouteName?: (normalizedFileName: string) => string
}

export interface Config extends UserConfig {
    middlewares: string
    routes: string
    fileExtensions: string[]
    filters: RegExp[]
}

export function getConfig(config: UserConfig): Config {
    return {
        baseDir: config.baseDir,
        middlewares: config.middlewares || "./middlewares",
        routes: config.routes || "./routes",
        fileExtensions: config.fileExtensions || [".ts", ".js"],
        filters: config.filters || [/\.d\.ts$/],
        generateRouteName: config.generateRouteName
    }
}
