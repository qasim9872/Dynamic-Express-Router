import { Request, Response } from "express"

export async function getHandler(req: Request, res: Response) {
    const id = req.params.id
    return res.status(200).json({
        id
    })
}
