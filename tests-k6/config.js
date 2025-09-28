export const config = {
    baseUrl: __ENV.BASE_URL || 'http://localhost:3000',
    defaultVUs: parseInt(__ENV.VUS) || 10,
    defaultDuration: __ENV.DURATION || '30s',
}