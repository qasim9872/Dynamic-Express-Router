import * as debug from "debug"

function extractNameFromPath(filePath: string): string {
    const extractedName = filePath.match(/.*\/(.*)\./)
    return extractedName ? extractedName[1] : filePath
}

export function createDebugger(filePath: string) {
    const name = extractNameFromPath(filePath)
    return debug(`dynamic-express-router:${name}`)
}
