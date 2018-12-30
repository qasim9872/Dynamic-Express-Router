import * as appDir from "app-root-path"
import * as path from "path"

export function extractNameFromPath(filePath: string): string {
  const extractedName = filePath.match(/.*\/(.*)\./)
  return extractedName ? extractedName[1] : filePath
}

export function getPath(relativePath: string, folderName: string) {
  return path.join(appDir.path, relativePath, folderName)
}

export function normalize(name: string): string {
  const cleanName = name.trim()
  const match = cleanName.match(/(.*)\./)

  const extracted = match ? match[1] : cleanName

  // TODO - remove hyphens
  // TODO - lowercase

  return `/${extracted}`
}

export function isObjectEmpty(obj: object) {
  const isEmpty = Object.keys(obj).length === 0

  return isEmpty
}
