import { Request, Response } from "express"

export async function handler(req: Request, res: Response) {
    return res.sendStatus(200)
}
