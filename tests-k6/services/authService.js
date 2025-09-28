import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep } from 'k6';
import randomStr from '../../tests-k6/utils/randomString.js';
import { config } from '../config.js';
import { requestsPerEndpoint , httpErrors } from '../utils/metrics.js';

export function registerUser() {
    const credentials = {
        username: `user_${randomStr(5)}`,
        password: `pass_${randomStr(7)}`
    };

    let res = http.post(`${config.baseUrl}/api/auth/register`, JSON.stringify(credentials), {
        headers: { 'Content-Type': 'application/json' }, tags: { endpoint: 'registerUser' }
    });
    requestsPerEndpoint.add(1, { endpoint: 'registerUser' }); // count request
    if (res.error || res.status !== 201) {
        httpErrors.add(1, { endpoint: 'registerUser' });
    }

    check(res, {
        'Register - 201': (r) => r.status === 201
    }, {
        endpoint: 'registerUser'
    });

    sleep(randomIntBetween(1, 5));
    return credentials;
}

export function loginUser(credentials) {
    let res = http.post(`${config.baseUrl}/api/auth/login`, JSON.stringify(credentials), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: 'loginUser' }
    });
    requestsPerEndpoint.add(1, { endpoint: 'loginUser' }); // count request

    if (res.error || res.status !== 200) {
        httpErrors.add(1, { endpoint: 'loginUser' });
    }

    check(res, {
        'Login - 200': (r) => r.status === 200
    }, {
        endpoint: 'loginUser'
    });
    sleep(randomIntBetween(1, 5));
    return res.json().token;
}
