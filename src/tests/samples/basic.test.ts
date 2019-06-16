jest.mock("../../dynamic-express-router/utils/helper", () => ({
    ...jest.requireActual("../../dynamic-express-router/utils/helper"),
    logRoute: () => jest.fn()
}))

import * as supertest from "supertest"
import basicApp from "../../samples/basic"

describe(`sample: basic scenario`, () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async done => {
        const app = await basicApp()

        server = supertest(app)
        done()
    })

    it(`should GET /basic route`, async done => {
        server.get("/basic").expect(200, err => {
            done(err)
        })
    })

    it(`should POST /basic route`, async done => {
        server.post("/basic").expect(200, err => {
            done(err)
        })
    })

    it(`should PUT /basic route`, async done => {
        server.put("/basic").expect(200, err => {
            done(err)
        })
    })

    it(`should DELETE /basic route`, async done => {
        server.delete("/basic").expect(200, err => {
            done(err)
        })
    })
})
