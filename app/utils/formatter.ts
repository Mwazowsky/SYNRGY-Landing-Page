export interface InputData {
    plate: string;
    manufacture: string;
    model: string;
    image: string;
    type: string;
    description: string;
    transmission: string;
    capacity: string;
    rentPerDay: string;
    availableAt: string;
    available: string;
    year: string;
    specs: object;
    options: object;
    created_by: number;
    updated_by: number;
}

export interface OutputData {
    plate: string;
    manufacture: string;
    model: string;
    image: string;
    rentPerDay: string;
    capacity: number;
    description: string;
    availableAt: string;
    transmission: string;
    available: boolean;
    type: string;
    year: number;
    specs: object;
    options: object;
    created_by: number;
    updated_by: number;
}

class Formatter {
    carsDataConverter(input: InputData): OutputData {
        return {
            plate: input.plate,
            manufacture: input.manufacture,
            model: input.model,
            image: input.image,
            rentPerDay: input.rentPerDay,
            capacity: parseInt(input.capacity),
            description: input.description.trim(),
            availableAt: input.availableAt,
            transmission: input.transmission,
            available: input.available.toLowerCase() === 'true',
            type: input.type,
            year: parseInt(input.year),
            options: input.options,
            specs: input.specs,
            created_by: input.created_by,
            updated_by: input.updated_by,
        };
    }
}

export default Formatter;
