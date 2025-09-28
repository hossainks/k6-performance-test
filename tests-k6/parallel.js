import exec from 'k6/execution';
import { checkHealth } from './services/healthService.js';
import registerUserFlow from './flows/registerUserFlow.js';
import loginUserFlow from './flows/loginUserFlow.js';
import createBookFlow from './flows/createBookFlow.js';
import getBooksFlow from './flows/getBooksFlow.js';
import getAllBooksFlow from './flows/getAllBooksFlow.js';
import { config } from './config.js';

export function setup() {
    const res = checkHealth();
    if (res.error) {
        exec.test.abort("Aborting test. Application is Down")
    }
}

export const options = {
    scenarios: {
        register_users: {
            executor: 'constant-vus',
            vus: config.defaultVUs,
            duration: config.defaultDuration,
            exec: 'registerUserFlow',
        },
        login: {
            executor: 'constant-vus',
            vus: config.defaultVUs,
            duration: config.defaultDuration,
            exec: 'loginUserFlow',
        },
        createBook: {
            executor: 'constant-vus',
            vus: config.defaultVUs,
            duration: config.defaultDuration,
            exec: 'createBookFlow',
        },
        get_books: {
            executor: 'constant-vus',
            vus: config.defaultVUs,
            duration: config.defaultDuration,
            exec: 'getAllBooksFlow',
        },
        get_books: {
            executor: 'constant-vus',
            vus: config.defaultVUs,
            duration: config.defaultDuration,
            exec: 'getBooksFlow',
        }

    },

    thresholds: {
        "http_req_duration{endpoint:registerUser}": ["p(95)<1000"],
        "http_req_duration{endpoint:loginUser}": ["p(95)<1000"],
        "http_req_duration{endpoint:createBook}": ["p(95)<1000"],
        "http_req_duration{endpoint:getAllBooks}": ["p(95)<1000"],
        "http_req_duration{endpoint:getSingleBook}": ["p(95)<1000"],

        "requests_per_endpoint{endpoint:registerUser}": ["count>=50"],
        "requests_per_endpoint{endpoint:loginUser}": ["count>=50"],
        "requests_per_endpoint{endpoint:createBook}": ["count>=50"],
        "requests_per_endpoint{endpoint:getAllBooks}": ["count>=50"],
        "requests_per_endpoint{endpoint:getSingleBook}": ["count>=50"],

        "http_errors{endpoint:registerUser}": ["count<1"],
        "http_errors{endpoint:loginUser}": ["count<1"],
        "http_errors{endpoint:createBook}": ["count<1"],
        "http_errors{endpoint:getAllBooks}": ["count<1"],
        "http_errors{endpoint:getSingleBook}": ["count<1"],

        "checks{endpoint:registerUser}": ["rate>=0.99"],
        "checks{endpoint:loginUser}": ["rate>=0.99"],
        "checks{endpoint:createBook}": ["rate>=0.99"],
        "checks{endpoint:getAllBooks}": ["rate>=0.99"],
        "checks{endpoint:getSingleBook}": ["rate>=0.99"],
    },
};

export { registerUserFlow, loginUserFlow, createBookFlow, getAllBooksFlow, getBooksFlow };