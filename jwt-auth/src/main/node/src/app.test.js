const app = require('./app');
const jwt = require('jsonwebtoken');

test('it should get the proper jwt', () => {
    const token = app.auth('tveronezi', 'my pass', '10y');
    console.log(`the token -> '${token}'`);
    console.log(`the public key -> '${app.publicKey}'`);
    jwt.verify(token, app.publicKey, {
        algorithms: ['RS256']
    });
    const decoded = jwt.decode(token);
    console.log(decoded);
    expect(decoded.groups.join(',')).toBe('todo');
    expect(decoded.upn).toBe('tveronezi');
});