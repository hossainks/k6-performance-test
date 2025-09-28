import { registerUser, loginUser } from '../../tests-k6/services/authService.js';
import { getAllBooks, getBookById } from '../services/bookService.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  const creds = registerUser();
  const token = loginUser(creds);

  const booksList = getAllBooks(token);
  const { _id, title } = randomItem(booksList);

  getBookById(token, _id, title);
}
