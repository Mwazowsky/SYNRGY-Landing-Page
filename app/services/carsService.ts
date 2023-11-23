import CarsRepository from "../repositories/carsRepository";

import Formatter, { OutputData } from '../utils/formatter';

class CarsService {
  private formatter: Formatter;

  constructor() {
    this.formatter = new Formatter()
  }

  async create(requestBody: any) {
    try {
      const convertedData: OutputData = this.formatter.carsDataConverter(requestBody);
      return await CarsRepository.create(convertedData);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(car_id: number, requestBody: any) {
    try {
      const convertedData: OutputData = this.formatter.carsDataConverter(requestBody);
      console.log("convertedData >>> ", convertedData);
      return await CarsRepository.update(car_id, convertedData);
    } catch (err) {
      throw err;
    }
  }

  async delete(car_id: number) {
    try {
      return await CarsRepository.delete(car_id);
    } catch (err) {
      throw err;
    }
  }

  async list() {
    try {
      const data = await CarsRepository.findAll();
      const count = await CarsRepository.getTotalCars();

      return {
        data,
        count,
      };
    } catch (err) {
      throw err;
    }
  }

  async get(car_id: number) {
    try {
      return await CarsRepository.find(car_id);
    } catch (err) {
      throw err;
    }
  }
}

export default new CarsService();
