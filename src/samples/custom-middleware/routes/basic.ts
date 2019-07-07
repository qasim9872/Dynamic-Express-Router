import { Request, Response } from "express"

export const getMiddlewares = [{ name: "init-throw-error", data: { throw: true } }]

export async function getHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}

export const postMiddlewares = [{ name: "init-throw-error", data: { throw: false } }]

export async function postHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}
