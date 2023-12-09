import { Knex } from "knex";

const tableName = "cars";
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  const cars = [
    {
      available: true,
      availableAt: "2023-12-08T17:00:00.000Z",
      capacity: 4,
      car_id: 1,
      created_at: "2023-12-09T09:05:20.986Z",
      created_by: 2 ,
      description: "Test Car",
      image: "https://res.cloudinary.com/ddpriosuk/image/upload/v1702112719/jlrvld42rjaoofkk4pia.png",
      manufacture: "Test Car",
      model: "Test Car",
      options: {
        "optionsInputFields": [
          {
            "option": "Test Car"
          }
        ]
      },
      plate: "Test Car" ,
      rentPerDay: "10000000",
      specs: {
        "specsInputFields": [
          {
            "spec": "Test Car"
          }
        ]
      },
      transmission: "Test Car",
      type:"Test Car",
      updated_at: null,
      updated_by: 2,
      year: 2020
    }
  ];

  // Inserts seed entries
  await knex(tableName).insert(
    cars.map(({ car_id, ...restData }) => {
      return {
        ...restData,
        specs: JSON.stringify(restData.specs),
        options: JSON.stringify(restData.options),
      };
    })
  );
}

