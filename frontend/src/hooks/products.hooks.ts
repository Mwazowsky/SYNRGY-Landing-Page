import axios from 'axios';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { ICar } from '../content/applications/Products/products.types';
import { IApiResponse, IMeta, IParams } from '../services/types';
import { useNavigate } from 'react-router-dom';
import { Filters } from "../types/productsTable";
import { SelectChangeEvent } from '@mui/material';

const statusOptions = [
    {
        id: "all",
        name: "All",
        value: "all",
    },
    {
        id: "available",
        name: "Available",
        value: "available",
    },
    {
        id: "unavailable",
        name: "Unavailable",
        value: "unavailable",
    },
];

type CarData = Array<ICar>;

export default function useProducts() {
  const navigate = useNavigate();
  const [params, setParams] = useState<IParams>({
    page: 1,
    size: 10,
  });
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [cars, setCars] = useState<CarData>([]);
  const [filters, setFilters] = useState<Filters>({ status: "all" });
  const [selectedcars, setSelectedcars] = useState<number[]>([]);

  const handleStatusChange = (e: SelectChangeEvent<string>): void => {
    const value = e.target.value;
    console.log("value >>>", value);
    const selectedOption = statusOptions.find((option) => option.id === value);

    if (selectedOption) {
      console.log("Selected Option:", selectedOption.value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        status: selectedOption.value,
      }));
    } else {
      console.log("No matching option found for value:", value);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParams({
      ...params,
      search: value,
    });
    console.log(params)
  };

  const handleRemove = async (
    e: MouseEvent<HTMLButtonElement>,
    record: ICar
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`https://binar-rental-backend-app.fly.dev/api/cars/${record?.car_id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        await fetchCars();
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleRemoveMultiple = async (
    e: MouseEvent<HTMLButtonElement>,
    carIds: number[]
  ) => {
    e.stopPropagation();
    const confirmed = confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        const deletePromises = carIds.map(async (carId) => {
          await axios.delete(`https://binar-rental-backend-app.fly.dev/api/cars/${carId}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
        });
        console.log(deletePromises);
        await Promise.all(deletePromises);
        await fetchCars(); // Assuming fetchCars fetches the updated list
      } catch (error) {
        console.log('error > ', error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: ICar) => {
    e.stopPropagation();
    navigate(`/form/update-form/${record.car_id}`);
  };

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<CarData>>(
        'https://binar-rental-backend-app.fly.dev/api/cars',
        {
          params,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      console.log("Response hook >>> ", response);
      setCars(response?.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log('error > ', error);
    } finally {
      setLoading(false);
    }
  }, [params]); // Include only the necessary dependencies here

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return {
    cars,
    filters, 
    params,
    loading,
    meta,
    setParams,
    handleStatusChange,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch,
  };
}
