import { Request, Response } from "express"

export async function getHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}

export async function postHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}

export async function putHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}

export async function deleteHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}
