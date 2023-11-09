const Router = require('express').Router;

const storage = require('../../../services/storage'); // local
const upload = require('../../../services/upload'); // local
const db = require("../../../services/DB");

// /api/books
function ApiRouterCar() {
    const router = Router(); // instance dari function Router

    // Read All
    router.get('/', async (req, res) => {
        try {
            const cars = await db.select("*").from("cars");
            res.status(200).json({ cars: cars });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Read One
    router.get('/:id', async (req, res) => {
        const carId = req.params.id;
        try {
            const car = await db.select("*").from("cars").where({ car_id: carId }).first();
            if (!car) {
                return res.status(404).json({ error: "Car not found" });
            }
            res.json(
                car
            );
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Create
    router.post('/new', upload.single('file'), async (req, res) => {
        const { name, rate, size } = req.body;
    
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
            const cars = await db("cars").insert({
                car_name: name,
                rate: parseFloat(rate[0]),
                capacity: parseInt(size, 10),
                picture: imgURL, // Include the img-url here
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
    
    // Update
    router.put("/edit/:id", upload.single('file'), async (req, res) => {
        const { id } = req.params;
    
        const existingCar = await db("cars")
            .where({ car_id: id })
            .first();
    
        if (!existingCar) {
            return res.status(404).json({ error: "Car not found" });
        }
    
        const { car_name, rate, capacity } = req.body;
    
        const updatedCarData = {
            car_name: car_name || existingCar.car_name,
            rate: rate ? parseFloat(rate) : existingCar.rate,
            capacity: capacity ? (isNaN(parseInt(capacity, 10)) ? existingCar.capacity : parseInt(capacity, 10)) : existingCar.capacity,
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
            const updatedCar = await db("cars")
                .where({ car_id: id })
                .update({
                    car_name: updatedCarData.car_name,
                    rate: updatedCarData.rate,
                    capacity: updatedCarData.capacity,
                    picture: imgURL,
                }, ["car_id", "car_name", "rate", "capacity", "picture"]);
    
            if (updatedCar.length !== 0) {
                res.status(201).send(updatedCar);
            } else {
                res.status(404).json({ error: "Car not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    // Delete
    router.delete("/delete/:id", async (req, res) => {
        const { id } = req.params;
    
        try {
            const car = await db("cars").where({ car_id: id }).del();
            if (car) {
                res.status(204).send({ Success: "car deleted" });
            } else {
                res.status(404).json({ error: "cars not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

module.exports = ApiRouterCar;
