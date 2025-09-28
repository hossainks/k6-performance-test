// //routes/bookRoutes.js
// const express = require("express");
// const router = express.Router();
// const BookController = require("../controllers/bookController");

// router.post("/", BookController.createBook);
// router.get("/", BookController.getBooks);
// router.get("/:bookId", BookController.getBookById);
// router.put("/:bookId", BookController.updateBook);
// router.delete("/:bookId", BookController.deleteBook);

// module.exports = router;

const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, BookController.createBook);
router.get("/", auth, BookController.getBooks);
router.get("/:bookId", auth, BookController.getBookById);
router.put("/:bookId", auth, BookController.updateBook);
router.delete("/:bookId", auth, BookController.deleteBook);

module.exports = router;

