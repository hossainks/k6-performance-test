export const config = {
    baseUrl: __ENV.BASE_URL || 'http://172.27.69.178:30561',
    defaultVUs: parseInt(__ENV.VUS) || 10,
    defaultDuration: __ENV.DURATION || '30s',
}