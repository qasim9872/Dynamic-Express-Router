export function normalizeFileName(name: string): string {
    const cleanName = name.trim()
    const match = cleanName.match(/(.*)\./)

    const extracted = match ? match[1] : cleanName

    // TODO - remove hyphens
    // TODO - lowercase

    return `/${extracted}`
}
