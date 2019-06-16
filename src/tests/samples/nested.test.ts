import * as supertest from "supertest"
import nestedApp from "../../samples/nested"

describe(`sample: nested scenario`, () => {
    let server: supertest.SuperTest<supertest.Test>

    beforeAll(async done => {
        const app = await nestedApp()

        server = supertest(app)
        done()
    })

    it(`should GET /basic route`, async done => {
        server.get("/basic").expect(200, err => {
            done(err)
        })
    })

    it(`should GET /nested/subpath route`, async done => {
        server.get("/nested/subpath").expect(200, err => {
            done(err)
        })
    })

    it(`should GET /dynamic/id route`, async done => {
        const id = "12345"
        server.get(`/dynamic/${id}`).expect(200, (err, res) => {
            expect(res.body.id).toBe(id)
            done(err)
        })
    })
})
