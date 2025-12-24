import { Request, Response, Router } from 'express';
import * as bookController from '../controllers/bookController';
import {
  createBookValidation,
  idParamValidation,
  updateBookValidation,
} from '../validators/bookValidator';
import { validationResult } from 'express-validator';

const router = Router();

router.post(
  '/api/books',
  createBookValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await bookController.createBook(req, res);
  },
);

router.get('/api/books', bookController.getAllBooks);

router.get(
  '/api/books/:id',
  idParamValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await bookController.getBookById(req, res);
  },
);

router.put(
  '/api/books/:id',
  updateBookValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await bookController.updateBookById(req, res);
  },
);

router.delete(
  '/api/books/:id',
  idParamValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await bookController.deleteBookById(req, res);
  },
);

export default router;
