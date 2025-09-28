import http from 'k6/http';
import { config } from '../config.js';

export function checkHealth() {
    const res = http.get(`${config.baseUrl}/health`);
    return res;
}