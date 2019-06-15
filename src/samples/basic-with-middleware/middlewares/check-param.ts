import { Request, Response, NextFunction } from "express"

export async function checkParamMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.params.error) {
        res.sendStatus(500)
    } else {
        next()
    }
}
