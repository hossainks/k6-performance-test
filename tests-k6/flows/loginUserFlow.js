import { registerUser, loginUser } from '../../tests-k6/services/authService.js';

export default function () {
    const creds = registerUser();
    loginUser(creds);
}
