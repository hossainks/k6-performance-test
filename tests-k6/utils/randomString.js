export default function (length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let randStr = ''
    for (let i = 0; i < length; i++) {
        randStr += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return randStr
}