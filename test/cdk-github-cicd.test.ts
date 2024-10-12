import { handler } from "../services/hello"

describe('hello world test group', ()=>{
    test('handler to retun code 200', async ()=>{
        const result = await handler({},{});
        expect(result.statusCode).toEqual(300);
    })
} )