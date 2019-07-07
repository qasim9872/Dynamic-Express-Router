jest.mock("../../dynamic-express-router/utils/helper", () => ({
    ...jest.requireActual("../../dynamic-express-router/utils/helper"),
    logRoute: () => jest.fn()
}))

import * as supertest from "supertest"
import filterExtensionsApp from "../../samples/filter-extensions"

describe(`sample: filter extensions scenario`, () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async done => {
        const app = await filterExtensionsApp()

        server = supertest(app)
        done()
    })

    describe(`basic route`, () => {
        it(`should GET /basic route`, async done => {
            server.get("/basic").expect(200, err => {
                done(err)
            })
        })
    })

    describe(`nested route`, () => {
        it(`should GET /nested route`, async done => {
            server.get("/nested").expect(200, err => {
                done(err)
            })
        })
    })
})
