import { Request, Response, NextFunction } from "express"

export async function checkParamMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.error) {
        res.sendStatus(500)
    } else {
        next()
    }
}
