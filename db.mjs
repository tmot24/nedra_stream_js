class Car {
    constructor(brand, model, year, fuel, bodyType, price) {
        this.brand = brand
        this.model = model
        this.year = year
        this.fuel = fuel
        this.bodyType = bodyType
        this.price = price
    }
}

export const db = {
    cars: [new Car("Audi", "100",2020,"diesel","Hatchback",2000),
        new Car("BMW", "1 серии",2020,"diesel","Hatchback",2000),
        new Car("Chery", "Amulet (A15)",2020,"diesel","Hatchback",2000),
        new Car("Chevrolet", "Astro",2020,"diesel","Hatchback",2000),
        new Car("Citroen", "BX",2020,"diesel","Hatchback",2000),
        new Car("Daewoo", "Alpheon",2020,"diesel","Hatchback",2000),
        new Car("Ford", "Atlas",2020,"diesel","Hatchback",2000),
        new Car("Geely", "Accord",2020,"diesel","Hatchback",2000),
        new Car("Honda", "Accent",2020,"diesel","Hatchback",2000),
        new Car("Hyundai", "Avella",2020,"diesel","Hatchback",2000),
        new Car("Kia", "1111 Ока",2020,"diesel","Hatchback",2000),
    ],
    /*    brand: "string",
        model: "string",
        year: "number",
        fuel: "string", // (diesel, petrol, electric, hybrid)
        bodyType: "string", // (Hatchback, Estate, SUV, Sedan, MPV, Pickup, Cabrio)
        price: "number"*/
}