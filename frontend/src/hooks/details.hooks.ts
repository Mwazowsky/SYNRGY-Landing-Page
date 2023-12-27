import axios from 'axios';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICar } from 'src/types/product';

export default function useDetails() {
    const { car_id } = useParams();
    const [car, setCar] = useState<ICar>({
        car_id: 0,
        plate:"",
        manufacture:"",
        image:"",
        model:"",
        type:"",
        description:"",
        transmission:"",
        capacity: 0,
        rentPerDay:"",
        availableAt:"",
        available: false,
        year: 0,
        options: {},
        specs: {},
        created_by: 0,
        updated_by: 0,
    });
    const [optionsInputFields, setOptionsInputFields] = useState<{ option: string }[]>([{ option: "" }]);
    const [specsInputFields, setSpecsInputFields] = useState<
        { spec: string }[]
    >([{ spec: "" }]);
    {
        const fetchCarData = useCallback(async () => {
            try {
              const response = await axios.get(
                `https://binar-rental-backend-app.fly.dev/api/cars/${car_id}`,
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const carData = response.data.data;
              setCar(carData);
              setOptionsInputFields(carData.options.optionsInputFields);
              setSpecsInputFields(carData.specs.specsInputFields);
            } catch (error) {
              console.log("error > ", error);
            }
          }, [car_id]);

        return {
          car,
          optionsInputFields,
          specsInputFields,
          setCar,
          fetchCarData
        };
    }
}
