export function extractNameFromPath(path: string): string {
  const extractedName = path.match(/.*\/(.*)\./)
  return extractedName ? extractedName[1] : path
}
