import * as supertest from "supertest"
import basicWithMiddlewareApp from "../../samples/basic-with-middleware"

describe(`sample: basic scenario`, () => {
    it(` should GET /basic route`, async done => {
        const app = await basicWithMiddlewareApp()

        const server = supertest(app)

        server.get("/basic").expect(200, (err, res) => {
            done(err)
        })
    })

    it(`should hit the middleware and return 500`, async done => {
        const app = await basicWithMiddlewareApp()

        const server = supertest(app)

        server.get("/basic?error=true").expect(500, (err, res) => {
            done(err)
        })
    })
})
