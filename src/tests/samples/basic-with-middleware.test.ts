import * as supertest from "supertest"
import basicWithMiddlewareApp from "../../samples/basic-with-middleware"

describe(`sample: basic with middleware scenario`, () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async done => {
        const app = await basicWithMiddlewareApp()

        server = supertest(app)
        done()
    })

    it(`should GET /basic route`, async done => {
        server.get("/basic").expect(200, (err, res) => {
            done(err)
        })
    })

    it(`should GET /subroutes route`, async done => {
        server.get("/subroutes").expect(200, (err, res) => {
            done(err)
        })
    })

    it(`should hit the middleware and return 500`, async done => {
        server
            .get("/basic")
            .query({ error: true })
            .expect(500, (err, res) => {
                done(err)
            })
    })
})
