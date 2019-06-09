import * as appDir from "app-root-path"
import * as path from "path"
// import { IRouteConfig, requestTypes } from "../../route-boiler/IRoute.interface"
// import IRoute from "./../IRoute"

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

// export function validateRouteFile(routeFile: any): IRoute {
//   const errors: string[] = []

//   // assert requestTypes
//   // if (!Object.values(requestTypes).includes(routeFile.method)) {
//   //   // errors.push()
//   //   errors.push(`Invalid request method: ${routeFile.method}`)
//   // }

//   // assert schema

//   // assert middlewares

//   // assert handler

//   if (errors.length > 0) {
//     throw new Error(errors.toString())
//   } else {
//     return (routeFile as any) as IRoute
//   }
// }
