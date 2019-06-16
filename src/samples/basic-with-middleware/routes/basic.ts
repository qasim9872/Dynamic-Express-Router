import { Request, Response } from "express"

export const getMiddlewares = ["check-param"]

export async function getHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}

export const postMiddlewares = ["check-param"]

export async function postHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}

export const putMiddlewares = ["check-param"]

export async function putHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}

export const deleteMiddlewares = ["check-param"]

export async function deleteHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}
