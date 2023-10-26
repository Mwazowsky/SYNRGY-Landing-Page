class Component {

    static list = [];

    static init(cars) {
        this.list = cars.map((car) => new this(car));
    }

    constructor({ id, plate, manufacture, model, image, rentPerDay, capacity, description, transmission, available, type, year, options, specs, availableAt }) {
        this.id = id;
        this.plate = plate;
        this.manufacture = manufacture;
        this.model = model;
        this.image = image;
        this.rentPerDay = rentPerDay;
        this.capacity = capacity;
        this.description = description;
        this.transmission = transmission;
        this.available = available;
        this.type = type;
        this.year = year;
        this.options = options;
        this.specs = specs;
        this.availableAt = availableAt;
    }

    render() {
        return `
        <div class="card rounded overflow-hidden d-flex flex-column">
            <img src="${this.image}" alt="" height="200">
            <div class="card-body position-relative d-flex flex-column flex-grow-1">
                <h3 class="fs-6">Nama/Tipe Mobil</h3>
                <h3 class="fs-5 fw-bold">Rp. ${this.rentPerDay.toLocaleString()} / hari</h3>
                ${this.description}
                <ul class="list-unstyled mt-2 mb-4">
                    <li class="d-flex gap-2 align-items-center mb-2">
                        <img src="./images/assets/fi_users.png" width="22">
                        <p class="mb-0">${this.capacity} Orang</p>
                    </li>
                    <li class="d-flex gap-2 align-items-center mb-2">
                        <img src="./images/assets/fi_settings.png" width="22">
                        <p class="mb-0">${this.transmission}</p>
                    </li>
                    <li class="d-flex gap-2 align-items-center mb-2">
                        <img src="./images/assets/fi_calendar.png" width="22">
                        <p class="mb-0">Tahun ${this.year}</p>
                    </li>
                </ul>
                <button class="btn btn-success mt-auto">Pilih Mobil</button>
            </div>
        </div>`;
    }
}