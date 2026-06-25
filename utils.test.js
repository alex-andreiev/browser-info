import { generateKey } from './src/utils.js';

test('generateKey capitalizes first letter', () => {
    expect(generateKey('test')).toBe('Test');
    expect(generateKey('test', 'my')).toBe('myTest');
});
