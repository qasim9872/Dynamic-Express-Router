jest.mock("../../route-boiler/utils/helper", () => ({
    ...jest.requireActual("../../route-boiler/utils/helper"),
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

    it(`should GET /basic route`, async done => {
        server.get("/basic").expect(200, err => {
            done(err)
        })
    })
})
