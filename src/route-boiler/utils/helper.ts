export function normalizeFileName(name: string): string {
    const cleanName = name.trim().toLowerCase()
    const match = cleanName.match(/(.*)\./)

    const extracted = match ? match[1] : cleanName

    // TODO - remove hyphens?

    return extracted
}

export function getNormalizedRouteName(name: string) {
    let routePath = normalizeFileName(name)

    if (routePath.startsWith("_")) {
        routePath = routePath.replace("_", ":")
    }

    return `/${routePath}`
}
