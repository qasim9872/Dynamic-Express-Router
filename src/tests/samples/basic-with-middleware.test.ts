jest.mock("../../dynamic-express-router/utils/helper", () => ({
    ...jest.requireActual("../../dynamic-express-router/utils/helper"),
    logRoute: () => jest.fn()
}))

import * as supertest from "supertest"
import basicWithMiddlewareApp from "../../samples/basic-with-middleware"

describe(`sample: basic with middleware scenario`, () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async done => {
        const app = await basicWithMiddlewareApp()

        server = supertest(app)
        done()
    })

    describe(`configure /basic route`, () => {
        const route = "/basic"

        it(`should GET ${route} route`, async done => {
            server.get(route).expect(200, (err, res) => {
                done(err)
            })
        })

        it(`should hit the middleware and return 500`, async done => {
            server
                .get(route)
                .query({ error: true })
                .expect(500, (err, res) => {
                    done(err)
                })
        })

        it(`should POST ${route} route`, async done => {
            server.post(route).expect(200, (err, res) => {
                done(err)
            })
        })

        it(`should hit the middleware and return 500`, async done => {
            server
                .post(route)
                .query({ error: true })
                .expect(500, (err, res) => {
                    done(err)
                })
        })

        it(`should PUT ${route} route`, async done => {
            server.put(route).expect(200, (err, res) => {
                done(err)
            })
        })

        it(`should hit the middleware and return 500`, async done => {
            server
                .put(route)
                .query({ error: true })
                .expect(500, (err, res) => {
                    done(err)
                })
        })

        it(`should DELETE ${route} route`, async done => {
            server.delete(route).expect(200, (err, res) => {
                done(err)
            })
        })

        it(`should hit the middleware and return 500`, async done => {
            server
                .delete(route)
                .query({ error: true })
                .expect(500, (err, res) => {
                    done(err)
                })
        })
    })
})
