class Car {
    constructor() {
        this.carContainerElement = document.getElementById("root");
        this.searchBtn = document.getElementById("btn-search");
        this.driverType = document.getElementById("driverType");
        this.warning = document.querySelector(".warning");
        this.date = document.getElementById("tanggal");
        this.wktJemput = document.getElementById("wkt_jemput");
        this.jmlhPenumpang = document.getElementById("jmlhPenumpang");
        this.focusDiv = document.getElementById("focus-div");
    }

    async init() {
        this.driverType.addEventListener("input", this.addFocusClass);
        this.date.addEventListener("input", this.addFocusClass);
        this.wktJemput.addEventListener("input", this.addFocusClass);
        this.jmlhPenumpang.addEventListener("input", this.addFocusClass);

        document.body.addEventListener("click", this.handleClickOutside);

        await this.load();

        document.body.onload = this.carAvailable;
        this.searchBtn.onclick = this.run;
    }

    addFocusClass = () => {
        this.focusDiv.classList.add("focused");
    }

    handleClickOutside = (event) => {
        if (
            event.target !== this.driverType &&
            event.target !== this.date &&
            event.target !== this.wktJemput &&
            event.target !== this.jmlhPenumpang &&
            event.target !== this.focusDiv
        ) {
            this.focusDiv.classList.remove("focused");
        }
    }

    carAvailable = () => {
        let cars = "";

        Component.list
            .filter((car) => car.available)
            .map((car) => {
                cars += car.render();
                this.carContainerElement.innerHTML = cars;
            });
    }

    run = () => {
        let dateTime = new Date(`${this.date.value} ${this.wktJemput.value}`);
        let cars = "";
        let driverType = this.driverType.value === 'true';

        this.focusDiv.classList.remove("focused");

        const getCarLenght = Component.list
            .filter((car) =>
                car.available === driverType &&
                new Date(car.availableAt) >= dateTime &&
                car.capacity >= this.jmlhPenumpang.value
            )
            .map((car) => {
                cars += car.render();
                this.carContainerElement.innerHTML = cars;
            });

        console.log(getCarLenght.length);

        if (getCarLenght.length === 0) {
            this.carContainerElement.innerHTML = '';
            this.warning.classList.remove('visually-hidden');
        } else {
            this.warning.classList.add('visually-hidden');
        }

    }

    async load() {
        const cars = await Binar.listCars();
        console.log(cars);
        Component.init(cars);
    }

}
