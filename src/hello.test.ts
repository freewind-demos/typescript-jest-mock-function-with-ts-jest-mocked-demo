import { mocked } from 'jest-mock'
import { hello } from './hello';

jest.mock('./hello');

describe('User', () => {

    const helloMock = mocked(hello);

    beforeEach(() => helloMock.mockClear());

    it('hello', async () => {
        helloMock.mockImplementation((s) => Promise.resolve(s.toUpperCase()));

        async function runHello(helloFn: (name: string) => Promise<string>): Promise<string> {
            return await helloFn('test');
        }

        // Notice: it's good no compilation error
        const result = await runHello(helloMock);
        expect(result).toEqual('TEST')
    });

})
