import { registerUser } from '../../tests-k6/services/authService.js';

export default function () {
  registerUser();
}
