import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep } from 'k6';
import { config } from '../config.js';
import { getFullWords, getYears, books, authors } from '../../tests-k6/utils/randomData.js';
import { requestsPerEndpoint, httpErrors } from '../utils/metrics.js';

export function createBook(token) {
    const book = {
        title: getFullWords(2, books),
        author: getFullWords(2, authors),
        year: getYears(),
    };

    let res = http.post(`${config.baseUrl}/api/books`, JSON.stringify(book), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        tags: { endpoint: 'createBook' }
    });

    requestsPerEndpoint.add(1, { endpoint: 'createBook' }); // count request

    if (res.error || res.status !== 201) {
        httpErrors.add(1, { endpoint: 'createBook' });
    }

    check(res, {
        'Book Created - 201': (r) => r.status === 201
    }, {
        endpoint: 'createBook'
    });
    sleep(randomIntBetween(1, 5));
    return res.json();

}

export function getAllBooks(token) {
    let res = http.get(`${config.baseUrl}/api/books/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        tags: { endpoint: 'getAllBooks' }
    });

    requestsPerEndpoint.add(1, { endpoint: 'getAllBooks' }); // count request

    if (res.error || res.status !== 200) {
        httpErrors.add(1, { endpoint: 'getAllBooks' });
    }

    check(res, {
        'Get all books - 200': (r) => r.status === 200
    }, {
        endpoint: 'getAllBooks'
    });
    sleep(randomIntBetween(1, 5));
    return res.json();
}

export function getBookById(token, id, expectedTitle) {
    let res = http.get(`${config.baseUrl}/api/books/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        tags: { endpoint: 'getSingleBook' }
    });

    requestsPerEndpoint.add(1, { endpoint: 'getSingleBook' }); // count request

    if (res.error || res.status !== 200) {
        httpErrors.add(1, { endpoint: 'getSingleBook' });
    }

    check(res, {
        'get book by id - 200': (r) => r.status === 200,
        'book matches': (r) => r.json().title === expectedTitle,
    }, {
        endpoint: 'getSingleBook'
    });
    sleep(randomIntBetween(1, 5));
    return res.json();
}
