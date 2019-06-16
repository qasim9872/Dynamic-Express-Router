jest.mock("../../route-boiler/utils/helper", () => ({
    ...jest.requireActual("../../route-boiler/utils/helper"),
    logRoute: () => jest.fn()
}))

import * as supertest from "supertest"
import allMiddlewareApp from "../../samples/all-middleware"

describe(`sample: all middleware scenario`, () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async done => {
        const app = await allMiddlewareApp()

        server = supertest(app)
        done()
    })

    describe(`configure basic route`, () => {
        const route = "/basic"
        it(`should GET ${route} route`, async done => {
            server.get(route).expect(200, (err, res) => {
                done(err)
            })
        })

        it(`should hit the all middleware and return 500`, async done => {
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

        it(`should hit the all middleware and return 500`, async done => {
            server
                .post(route)
                .query({ error: true })
                .expect(500, (err, res) => {
                    done(err)
                })
        })

        it(`should hit the post middleware and return 500`, async done => {
            server
                .post(route)
                .send({ error: true })
                .expect(500, (err, res) => {
                    done(err)
                })
        })
    })

    describe(`secondary route`, () => {
        const route = "/secondary"
        it(`should not have the all middleware configured`, async done => {
            server
                .get(route)
                .send({ error: true })
                .expect(200, (err, res) => {
                    done(err)
                })
        })
    })
})
