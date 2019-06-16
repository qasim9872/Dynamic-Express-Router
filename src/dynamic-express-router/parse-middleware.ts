import { normalizeFileName } from "./utils/helper"
import { createDebugger } from "./utils/debug"
import { isFunction } from "is-what"

const debug = createDebugger(__filename)

function getMiddlewareFunction(pathToFile: string, file: any, keys: string[]) {
    let middlewareFn: Function | null = null

    for (const key of keys) {
        const exportedMember = file[key]

        if (isFunction(exportedMember)) {
            middlewareFn = exportedMember
            break
        }
    }

    if (!middlewareFn) {
        throw new Error(`The file at path ${pathToFile} is not exporting any function`)
    }

    return middlewareFn
}

export default async function parseMiddlewareFile(pathToFile: string, fileName: string) {
    const file: any = await import(pathToFile)
    debug(`parsing file at path: ${pathToFile}`)

    const name = normalizeFileName(fileName)
    debug(`middleware name: ${name}`)

    const keys = Object.keys(file)

    if (keys.length === 0) {
        throw new Error(`The file at path ${pathToFile} has no exported members`)
    }

    const middlewareFn = getMiddlewareFunction(pathToFile, file, keys)

    return {
        name,
        middlewareFn
    }
}
