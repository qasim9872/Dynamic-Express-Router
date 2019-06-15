import { Request, Response } from "express"

async function getHandler(req: Request, res: Response) {
    res.sendStatus(200)
}

export const get = {
    requestType: "get",
    middleware: "check-param",
    handler: getHandler
}
