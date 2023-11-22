import { IRestModel, TPayload } from '../interfaces/IRest';
import database from '../../config/database';

export interface IBooks {
  id: string;
  title: string;
  author: string;
  isbn: string;
  published_year: number;
  genre: string;
  copies_available: number;
  total_copies: number;
  picture: string;
}

class Books implements IRestModel<IBooks> {
  constructor() { }
  async list() {
    const data = await database.select('*').from('books');
    return data as IBooks[];
  }

  async show(id: string) {
    const book = await database.select('*').from('books').where('id', id).first();

    if (!book) {
      throw new Error('Book not found');
    }

    return book as IBooks;
  }

  async create(payload: TPayload) {
    if (!payload) throw new Error('Payload is missing');

    const { title, author, isbn, published_year, genre, copies_available, total_copies, picture } = payload;

    const [insertedId] = await database('books').insert({
      title,
      author,
      isbn,
      published_year,
      genre,
      copies_available,
      total_copies,
      picture,
    }).returning('id');

    if (insertedId) {
      const createdBook = await database.select('*').from('books').where('id', insertedId.id).first();
      return createdBook as IBooks;
    } else {
      throw new Error('No ID returned after insertion');
    }
  }

  async update(id: string, payload: TPayload) {
    if (!payload || !id) {
      throw new Error('Payload or ID is missing');
    }

    const { title, author, isbn, published_year, genre, copies_available, total_copies, picture } = payload;

    const updatedCount = await database('books')
      .where('id', id)
      .update({
        title,
        author,
        isbn,
        published_year,
        genre,
        copies_available,
        total_copies,
        picture,
      });

    if (updatedCount === 0) {
      throw new Error('Book not found or no updates applied');
    }

    const updatedBook = await database.select('*').from('books').where('id', id).first();
    return updatedBook as IBooks;
  }

  async delete(id: string) {
    if (!id) {
      throw new Error('ID is missing');
    }

    const deletedBook = await database.select('*').from('books').where('id', id).first();

    if (!deletedBook) {
      throw new Error('Book not found');
    }

    const deletedCount = await database('books')
      .where('id', id)
      .del();

    if (deletedCount === 0) {
      throw new Error('Failed to delete book');
    }

    return deletedBook as IBooks;
  }


}

export default new Books();
