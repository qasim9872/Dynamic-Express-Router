import { Request, Response } from "express"

export async function getHandler(req: Request, res: Response) {
    res.sendStatus(200)
}
