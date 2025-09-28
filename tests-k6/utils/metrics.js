import { Counter } from 'k6/metrics';

// Counter for per-endpoint request counts
export const requestsPerEndpoint = new Counter('requests_per_endpoint');
export const httpErrors = new Counter('http_errors');