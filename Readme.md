# Dynamic Express Router

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A simple to use Express based library that automatically generates routes from a specified directory (default: /routes). Furthermore, allows for dynamic configuration of middlewares by specifying a middlewares folder (default: /middlewares) and using them in the routes using the middleware name.

## Getting Started

With NPM install the module with: `npm install dynamic-express-router --save`  
With YARN install the module with: `yarn add dynamic-express-router`

## Setup

To use the package, simply configure and use the package with express app.

```typescript
import express from "express"
import dynamicRouter from "dynamic-express-router"

export default async function setup() {
    const app = express()

    // Additional middlewares here

    const router = await dynamicRouter({
        baseDir: __dirname, // required
        middlewares: "./middlewares", // default - relative to baseDir
        routes: "./routes", // default - relative to baseDir
        fileExtensions: [".ts", ".js"], // default
        filters: [/\.d\.ts$/] // default - ignore type files
    })
    app.use(router)

    return app
}
```

## Example Routes File

export a function (handler) or a string array (middleware names) as you like, simply include the request type in the name and the package will pick it up.

```typescript
import { Request, Response } from "express"

// the array name contains the request type: get
export const getMiddlewares = ["name-of-middleware-file"]

// the function name contains the request type: get
export async function getHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}

// the function name contains the request type: post
export async function handlePost(req: Request, res: Response) {
    return res.sendStatus(200)
}
```

## Example Middleware File

```typescript
// file: middlewares/middleware-a.ts
// can be used in routes using the name "middleware-a"
import { Request, Response, NextFunction } from "express"

export async function checkParamMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.error) {
        res.sendStatus(500)
    } else {
        next()
    }
}
```

## Routes Generated Dynamically

The below folder structure

```code
/middlewares
    middleware-a.ts
    middleware-b.ts
/routes
    health-check.ts
    /user
        index.ts
        _id.ts
```

Will Generate the following routes

```routes

/health-check
/user
/user/:id

```

## Changelog

See changelog.md

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/qasim9872/Dynamic-Express-Router/issues

## Contribution

Pull requests are very welcome. Please:

-   ensure all tests pass before submitting PR
-   add an entry to CHANGELOG.md
-   add tests for new features
-   document new functionality/API additions in README.md

## License

Copyright (c) 2019 Muhammad Qasim. Licensed under the MIT license.
