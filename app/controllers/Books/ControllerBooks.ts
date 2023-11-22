import { Request, Response } from 'express';
import Media from '../../../config/media';

import BookModel, { IBooks } from '../../models/ModelBooks';
import { IRestController, TPayload } from '../../interfaces/IRest';

class ControllerBooks implements IRestController {
    constructor() { }
    async list(_: Request, res: Response) {
        try {
            const books: IBooks[] = await BookModel.list();

            res.status(200).json({
                meta: {
                    message: 'success',
                    success: true,
                    code: 200,
                },
                data: books,
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Error fetching books',
                error: error.message,
            });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const book: IBooks | undefined = await BookModel.show(id);

            if (!book) {
                res.status(404).json({
                    message: 'Book not found',
                });
                return;
            }

            res.status(200).json({
                message: 'Book found',
                data: book,
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Error fetching book',
                error: error.message,
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            let title = req.body.title;
            let author = req.body.author;
            let isbn = req.body.isbn;
            let published_year = req.body.published_year;
            let genre = req.body.genre;
            let copies_available = req.body.copies_available;
            let total_copies = req.body.total_copies;

            if (!req.file) {
                throw new Error('File is missing');
            }

            let picture = '';

            const fileBase64 = req.file.buffer.toString('base64');
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;
            const picture_url = await new Promise((resolve, reject) => {
                Media.storage.uploader.upload(file, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            picture = (picture_url as any)?.url;

            const payload: TPayload = {
                title,
                author,
                isbn,
                published_year,
                genre,
                copies_available,
                total_copies,
                picture,
            };

            const createdBook: IBooks = await BookModel.create(payload);

            res.status(201).json({
                message: 'Create success!',
                ...createdBook,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                message: 'Create failed!',
                error: error.message,
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            let title = req.body.title;
            let author = req.body.author;
            let isbn = req.body.isbn;
            let published_year = req.body.published_year;
            let genre = req.body.genre;
            let copies_available = req.body.copies_available;
            let total_copies = req.body.total_copies;

            if (!req.file) {
                throw new Error('File is missing');
            }

            const fileBase64 = req.file.buffer.toString('base64');
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;

            const picture_url = await new Promise((resolve, reject) => {
                Media.storage.uploader.upload(file, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            const picture = (picture_url as any)?.url;

            const payload: TPayload = {
                title,
                author,
                isbn,
                published_year,
                genre,
                copies_available,
                total_copies,
                picture,
            };

            const updatedBook: IBooks = await BookModel.update(id, payload);

            res.status(200).json({
                message: 'Update success!',
                ...updatedBook,
            });
        } catch (error: any) {
            res.status(400).json({
                message: 'Update failed!',
                error: error.message,
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deletedBook = await BookModel.delete(id);

            res.status(200).json({
                message: 'Book deleted successfully',
                data: deletedBook,
            });
        } catch (error: any) {
            res.status(400).json({
                message: 'Delete failed!',
                error: error.message,
            });
        }
    }
}

export default new ControllerBooks();
