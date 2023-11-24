import { Request, Response } from 'express';
import CarsService from '../../services/carsService'; // Import the created service
import authService from '../../services/authService';

import { IRestController } from '../../interfaces/IRest'

class CarsController implements IRestController {

  constructor() { }

  async healthCheck(req: Request, res: Response) {
    res.sendStatus(200)
  }

  async list(_: Request, res: Response) {
    try {
      const { data, count } = await CarsService.list();
      res.status(200).json({
        status: 'OK',
        data: { cars: data },
        meta: { total: count },
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { car_id } = req.params;
      const car = await CarsService.get(parseInt(car_id, 10));

      if (!car) {
        res.status(404).json({
          status: 'FAIL',
          message: 'Car not found',
        });
        return;
      }

      res.status(200).json({
        status: 'OK',
        data: car,
      });
    } catch (error: any) {
      res.status(422).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const imgURL: string = (req as any).imgURL;

      const headers = req.headers;

      if (!headers.authorization) {
        return res.status(403).json({
          data: 'not authorized',
        });
      }

      const options: object = {
        "CD (Single Disc)": true,
        "Airbag: Passenger": true,
        "A/C: Front": true,
        "Power Locks": true,
        "Navigation": true,
        "Rear Window Defroster": true,
        "MP3 (Single Disc)": true,
        "Airbag: Side": true
      };

      const specs: object = {
        "Electric speed-sensitive variable-assist pwr steering": true,
        "Steel side-door impact beams": true,
        "Dual bright exhaust tips": true,
        "Remote fuel lid release": true,
        "Traveler/mini trip computer": true
      };

      const bearerToken = `${headers.authorization}`.split('Bearer');
      const token = bearerToken[1]?.trim();

      const createdBy = authService.validateToken(token);

      console.log("createdBy >>>", (await createdBy).user_id);

      const requestBodyWithImgURL = {
        ...req.body,
        image: imgURL,
        options: options,
        specs: specs,
        created_by: (await createdBy).user_id,
        updated_by: (await createdBy).user_id
      };

      const createdcar = await CarsService.create(requestBodyWithImgURL);
      res.status(201).json({
        status: 'OK',
        data: createdcar,
      });
    } catch (error: any) {
      res.status(422).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const imgURL: string = (req as any).imgURL;

      const headers = req.headers;

      if (!headers.authorization) {
        return res.status(403).json({
          data: 'not authorized',
        });
      }

      const options = {
        "CD (Single Disc)": true,
        "Airbag: Passenger": true,
        "A/C: Front": true,
        "Power Locks": true,
        "Navigation": true,
        "Rear Window Defroster": true,
        "MP3 (Single Disc)": true,
        "Airbag: Side": true
      };

      const specs = {
        "Electric speed-sensitive variable-assist pwr steering": true,
        "Steel side-door impact beams": true,
        "Dual bright exhaust tips": true,
        "Remote fuel lid release": true,
        "Traveler/mini trip computer": true
      };

      const bearerToken = `${headers.authorization}`.split('Bearer');
      const token = bearerToken[1]?.trim();

      const updatedBy = authService.validateToken(token);

      console.log("updatedBy >>>", (await updatedBy).user_id);

      const requestBodyWithImgURL = {
        ...req.body,
        image: imgURL,
        options: options,
        specs: specs,
        updated_by: (await updatedBy).user_id
      };

      const { car_id } = req.params;
      const updatedCar = await CarsService.update(parseInt(car_id, 10), requestBodyWithImgURL);
      res.status(200).json({
        status: 'OK',
        data: updatedCar
      });
    } catch (error: any) {
      res.status(422).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { car_id } = req.params;
      await CarsService.delete(parseInt(car_id, 10));
      res.status(200).json({
        status: 'OK',
        message: "Successfully deleted car",
      });
    } catch (error: any) {
      res.status(422).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }
}

export default new CarsController();
