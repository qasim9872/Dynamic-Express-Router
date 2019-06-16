export function normalizeFileName(name: string): string {
    const cleanName = name.trim().toLowerCase()
    const match = cleanName.match(/(.*)\./)

    const extracted = match ? match[1] : cleanName

    // TODO - remove hyphens?

    return extracted
}

export function getNormalizedRouteName(name: string) {
    let routePath = normalizeFileName(name)

    // dynamic path
    if (routePath.startsWith("_")) {
        routePath = routePath.replace("_", ":")
    }

    // if index file, use the root as base
    if (routePath === "index") {
        routePath = ""
    }

    return `/${routePath}`
}
