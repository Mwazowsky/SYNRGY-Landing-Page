import express, { Express } from 'express'; // third-party module
import path from 'path'; // core module

import ApiBooks from './routes/api/ApiBooks';
import AuthApi from './routes/api/userApi';

const { PORT = 8000 } = process.env;
const PUBLIC_DIR = path.join(__dirname, 'public');

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.static(PUBLIC_DIR));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use('/api/books', ApiBooks.routes());
    this.app.use('/api/user', AuthApi.routes());
  }
  run() {
    this.app.listen(PORT, () => {
      console.log('Server running on http://localhost:%s', PORT);
    });
  }
}

new Server().run();