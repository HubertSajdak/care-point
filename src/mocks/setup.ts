import { beforeAll } from "vitest"
import { server } from "./server"
//establish api mocking before all tests
beforeAll(() => server.listen())
//reset handlers in between tests
//so they dont affect other tests
afterEach(() => server.resetHandlers())
//clean up after the tests are finished
afterAll(() => server.close())
