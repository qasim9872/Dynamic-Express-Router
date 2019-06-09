// import Router from "express-promise-router"
// import * as fse from "fs-extra"
// import { join } from "path"

// /* tslint:disable:no-var-requires */
// const validate = require("express-validation")

// import config from "./config/default.config"
// import { createDebugger } from "./utils/debug"
// import { getPath, isObjectEmpty, normalize } from "./utils/helpers"
// import { validateRoute } from "./utils/validation"

// const debug = createDebugger(__filename)

// async function loadRoute(name: string, path: string) {
//   const routeFile = (await import(path)).default

//   const routeConfig = validateRoute(routeFile)

//   let handlers = [...routeConfig.middlewares()]

//   const schema = routeConfig.validationSchema()
//   if (schema && !isObjectEmpty(schema)) {
//     handlers = handlers.concat(validate(schema))
//   }

//   return {
//     name: normalize(name),
//     method: routeConfig.method(),
//     handlers: handlers.concat(routeConfig.handler)
//   }
// }

// async function loadRoutes(path: string, prefix = ``) {
//   const router = Router()

//   const files = await fse.readdir(path)

//   await Promise.all(
//     files.map(async (fileName) => {
//       const filePath = join(path, fileName)
//       const stats = await fse.lstat(filePath)

//       if (stats.isDirectory()) {
//         const subRoute = normalize(fileName)
//         const subRouter = await loadRoutes(filePath, `${prefix}${subRoute}`)
//         router.use(subRoute, subRouter)
//       } else {
//         try {
//           const route = await loadRoute(fileName, filePath)
//           router.route(route.name)[route.method](route.handlers)
//           debug(`${route.method}: ${prefix}${route.name}`)
//         } catch (err) {
//           debug(`Error loading route from file: ${fileName}`)
//           debug(err)
//         }
//       }
//     })
//   )

//   return router
// }

// export default async function initialize(
//   relativePath: any, // = config.DEFAULT_RELATIVE_PATH,
//   folderName: any // = config.DEFAULT_FOLDER_NAME
// ) {
//   const fullPath = getPath(relativePath, folderName)
//   debug(`path to api folder: ${fullPath}`)

//   // Check if folder exists
//   const isPath = await fse.pathExists(fullPath)

//   if (!isPath) {
//     debug(`creating folder: ${folderName} inside ${relativePath}`)
//     await fse.ensureDir(fullPath)
//   }

//   const router = await loadRoutes(fullPath)
//   return router
// }
