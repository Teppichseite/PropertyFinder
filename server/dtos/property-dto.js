module.exports = class PropertyDto{
    constructor(name, longtidude, latidude, url, city, street, distance){
        this.name = name;
        this.longtidude = longtidude;
        this.latidude = latidude;
        this.url = url;
        this.city = city;
        this.street = street;
        this.distance = distance;
    }
}