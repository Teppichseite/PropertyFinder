module.exports = class BookingDto{

    constructor(bookingId, propertyId, propertyName, langtidude, latidude, city, url, userId, userName, email){
        this.id = bookingId;
        this.property_id = propertyId;
        this.property_name = propertyName;
        this.langtidude = langtidude;
        this.latidude = latidude;
        this.city = city;
        this.url = url;
        this.user = {
            id : userId,
            name : userName,
            email : email
        }
    }


}