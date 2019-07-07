import { Request, Response, NextFunction } from "express"

export async function initMiddleware(data: { [key: string]: any }) {
    return function checkParamMiddleware(req: Request, res: Response, next: NextFunction) {
        if (data.throw) {
            res.sendStatus(500)
        } else {
            next()
        }
    }
}
