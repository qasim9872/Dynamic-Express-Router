import * as supertest from "supertest"
import allMiddlewareApp from "../../samples/all-middleware"

describe(`sample: all middleware scenario`, () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async done => {
        const app = await allMiddlewareApp()

        server = supertest(app)
        done()
    })

    it(`should GET /basic route`, async done => {
        server.get("/basic").expect(200, (err, res) => {
            done(err)
        })
    })

    it(`should POST /basic route`, async done => {
        server.post("/basic").expect(200, (err, res) => {
            done(err)
        })
    })

    it(`should hit the all middleware and return 500`, async done => {
        server
            .get("/basic")
            .query({ error: true })
            .expect(500, (err, res) => {
                done(err)
            })
    })

    it(`should hit the all middleware and return 500`, async done => {
        server
            .post("/basic")
            .query({ error: true })
            .expect(500, (err, res) => {
                done(err)
            })
    })

    it(`should hit the post middleware and return 500`, async done => {
        server
            .post("/basic")
            .send({ error: true })
            .expect(500, (err, res) => {
                done(err)
            })
    })
})
