module.exports = class BookingDto{

    constructor(bookingId, propertyId, propertyName, longtidude, latidude, city, url, userId, userName, email){
        this.id = bookingId;
        this.property_id = propertyId;
        this.property_name = propertyName;
        this.longtidude = longtidude;
        this.latidude = latidude;
        this.city = city;
        this.url = url;
        if(email){
            this.user = {
                id : userId,
                name : userName,
                email : email
            }
        }
    }


}