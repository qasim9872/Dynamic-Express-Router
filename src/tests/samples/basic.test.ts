import * as supertest from "supertest"
import basicApp from "../../samples/basic"

describe(`sample: basic scenario`, () => {
    it(` should GET /basic route`, async done => {
        const app = await basicApp()

        const server = supertest(app)

        server.get("/basic").expect(200, err => {
            done(err)
        })
    })
})
