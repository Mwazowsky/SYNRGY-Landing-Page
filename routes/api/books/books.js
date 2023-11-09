const Router = require('express').Router;

const storage = require('../../../services/storage'); // local
const upload = require('../../../services/upload'); // local
const db = require("../../../services/DB");

// /api/books
function ApiRouterBook() {
    const router = Router(); // instance dari function Router

    // List
    router.get('/', async (req, res) => {
        const data = await db.select('*').from('books');
        res.status(200).json({
            data,
        });
    });

    // Single
    router.get('/:id', async (req, res) => {
        const id = req.params.id;
        const data = await db.select('*').from('books').where('books_id', '=', id);
        res.status(200).json({
            data: data[0],
        });
    });

    router.post('/new', upload.single('file'), async (req, res) => {
        const { title, author, isbn, publish_year, genre } = req.body;

        const fileBase64 = req.file.buffer.toString('base64');
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        let imgURL;

        try {
            const result = await new Promise((resolve, reject) => {
                storage.uploader.upload(file, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject('Gagal upload file');
                    } else {
                        resolve(result);
                    }
                });
            });

            imgURL = result.url;
        } catch (error) {
            return res.status(404).json({
                message: error,
                success: false,
            });
        }

        try {
            const cars = await db("books").insert({
                title: title,
                author: author,
                isbn: isbn,
                publish_year: parseInt(publish_year, 10),
                genre: genre,
                picture: imgURL,
            });

            res.status(201).json({
                message: 'Upload Berhasil',
                success: true,
                cars,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.put("/edit/:id", upload.single('file'), async (req, res) => {
        const { id } = req.params;

        const existingCar = await db("books")
            .where({ book_id: id })
            .first();

        if (!existingCar) {
            return res.status(404).json({ error: "Car not found" });
        }

        const { title, author, isbn, publish_year, genre } = req.body;

        const updatedCarData = {
            title: title || existingCar.title,
            author: author || existingCar.author,
            isbn: isbn || existingCar.isbn,
            publish_year: publish_year ? (isNaN(parseInt(publish_year, 10)) ? existingCar.publish_year : parseInt(publish_year, 10)) : existingCar.publish_year,
            genre: genre || existingCar.genre,
        };

        let imgURL;

        if (req.file) {
            const fileBase64 = req.file.buffer.toString('base64');
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;

            try {
                // Upload image to storage
                const result = await new Promise((resolve, reject) => {
                    storage.uploader.upload(file, (err, result) => {
                        if (err) {
                            console.log(err);
                            reject('Gagal upload file');
                        } else {
                            resolve(result);
                        }
                    });
                });

                imgURL = result.url;
            } catch (error) {
                return res.status(404).json({
                    message: error,
                    success: false,
                });
            }
        } else {
            imgURL = existingCar.picture;
        }

        try {
            const updatedCar = await db("books")
                .where({ book_id: id })
                .update({
                    title: updatedCarData.title,
                    author: updatedCarData.author,
                    isbn: updatedCarData.isbn,
                    publish_year: updatedCarData.publish_year,
                    genre: updatedCarData.genre,
                    picture: imgURL,
                }, [
                    "book_id",
                    "title",
                    "author",
                    "isbn",
                    "publish_year",
                    "genre",
                    "picture"
                ]);

            if (updatedCar.length !== 0) {
                res.status(201).send(updatedCar);
            } else {
                res.status(404).json({ error: "Car not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.delete("/delete/:id", async (req, res) => {
        const { id } = req.params;

        try {
            const book = await db("books").where({ book_id: id }).del();
            if (book) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "book not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

module.exports = ApiRouterBook;
