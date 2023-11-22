import { Router } from 'express';

import ControllerBooks from '../../controllers/Books/ControllerBooks';
import Media from '../../../config/media';

class ApiBooks {
    private router: Router;
    private uploadMiddleware;

    constructor() {
        this.router = Router();
        this.uploadMiddleware = Media.upload.single('file');
    }

    routes() {
        // REST dan CRUD
        this.router.get('/', ControllerBooks.list); // /api/books READ
        this.router.get('/:id', ControllerBooks.show); // /api/books/1 -> /api/books/:id READ
        this.router.post('/', this.uploadMiddleware, ControllerBooks.create); // /api/books CREATE
        this.router.put('/:id', this.uploadMiddleware, ControllerBooks.update); // /api/books/1 -> /api/books/:id UPDATE
        this.router.delete('/:id', ControllerBooks.delete); // /api/books/1 -> /api/books/:id DELETE

        return this.router;
    }
}

export default new ApiBooks();
