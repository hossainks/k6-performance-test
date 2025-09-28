import { registerUser, loginUser } from '../../tests-k6/services/authService.js';
import { createBook } from '../../tests-k6/services/bookService.js';

export default function () {
  const creds = registerUser();
  const token = loginUser(creds);
  createBook(token);
}
