jest.mock("../../dynamic-express-router/utils/helper", () => ({
    ...jest.requireActual("../../dynamic-express-router/utils/helper"),
    logRoute: () => jest.fn()
}))

import * as supertest from "supertest"
import customMiddlewareApp from "../../samples/custom-middleware"

describe(`sample: all middleware scenario`, () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async done => {
        const app = await customMiddlewareApp()

        server = supertest(app)
        done()
    })

    describe(`configure basic route`, () => {
        const route = "/basic"
        it(`should GET ${route} route`, async done => {
            server.get(route).expect(500, (err, res) => {
                done(err)
            })
        })

        it(`should POST ${route} route`, async done => {
            server.post(route).expect(200, (err, res) => {
                done(err)
            })
        })
    })
})
