import { json } from "body-parser"
import express, { Express } from "express"
import supertest from "supertest"

export function getAppInstance() {
  const app = express()

  app.use(json())

  return app
}

export function getServerInstance(app: Express) {
  return supertest(app)
}
