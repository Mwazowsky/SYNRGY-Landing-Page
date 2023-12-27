import axios from 'axios';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IFileItem } from 'src/services/types';
import { ICar } from 'src/types/product';

export default function useForm() {
    const { car_id } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<ICar>({
        car_id: 0,
        plate: "",
        manufacture: "",
        image: "",
        model: "",
        type: "",
        description: "",
        transmission: "",
        capacity: 0,
        rentPerDay: "",
        availableAt: "",
        available: false,
        year: 0,
        options: {},
        specs: {},
        created_by: 0,
        updated_by: 0,
    });
    const [loadingCover, setLoadingCover] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [fileItem, setFileItem] = useState<IFileItem>();
    const [optionsInputFields, setOptionsInputFields] = useState<
        { option: string }[]
    >([{ option: "" }]);
    const [specsInputFields, setSpecsInputFields] = useState<
        { spec: string }[]
    >([{ spec: "" }]);

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
          setFormValues(carData);
          setOptionsInputFields(carData.options.optionsInputFields);
          setSpecsInputFields(carData.specs.specsInputFields);
        } catch (error) {
          console.log("error > ", error);
        }
      }, [car_id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoadingSubmit(true);
            const payload = {
                ...formValues,
                image: fileItem?.secure_url,
                options: { optionsInputFields },
                specs: { specsInputFields },
                userToken: localStorage.getItem('token'),
            };
            console.log("Payload >>>", payload);

            await axios.post('https://binar-rental-backend-app.fly.dev/api/cars', payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            navigate("/management/products");
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleUploadCover = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        console.log(files);
        if (files && files.length > 0) {
            try {
                setLoadingCover(true);
                const formData = new FormData();
                formData.append('image', files[0]);

                const response = await axios.post(
                    'https://binar-rental-backend-app.fly.dev/api/cars/upload',
                    formData,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    }
                );
                setFileItem(response.data.data);
            } catch (error) {
                console.log('error > ', error);
            } finally {
                setLoadingCover(false);
            }
        }
    };

    const handleOptionsFormChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const data = [...optionsInputFields];
        data[index] = {
            ...data[index],
            [name]: value,
        };
        setOptionsInputFields(data);
    };

    const handleSpecsFormChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const data = [...specsInputFields];
        data[index] = {
            ...data[index],
            [name]: value,
        };
        setSpecsInputFields(data);
    };

    const addOptionFields = () => {
        const newfield = { option: "" };
        setOptionsInputFields([...optionsInputFields, newfield]);
    };

    const addSpecFields = () => {
        const newfield = { spec: "" };
        setSpecsInputFields([...specsInputFields, newfield]);
    };

    return {
        formValues,
        loadingCover,
        loadingSubmit,
        fileItem,
        optionsInputFields,
        specsInputFields,
        fetchCarData,
        handleSubmit,
        handleUploadCover,
        setFormValues,
        handleOptionsFormChange,
        handleSpecsFormChange,
        addOptionFields,
        addSpecFields
    };
}
