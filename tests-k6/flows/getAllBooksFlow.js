import { registerUser, loginUser } from '../services/authService.js';
import { getAllBooks, getBookById } from '../services/bookService.js';

export default function () {
  const creds = registerUser();
  const token = loginUser(creds);

  getAllBooks(token);
}
