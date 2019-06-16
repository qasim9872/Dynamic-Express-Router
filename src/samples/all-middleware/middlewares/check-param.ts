import { Request, Response, NextFunction } from "express"

export async function checkParamMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.query.error) {
        res.sendStatus(500)
    } else {
        next()
    }
}
