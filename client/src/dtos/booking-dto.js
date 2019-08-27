export default class BookingDto{

    constructor(bookingId, propertyId, propertyName, longtidude, latidude, 
        city, street, url, fromDate, toDate, userId, userName, email){
        this.id = bookingId;
        this.property_id = propertyId;
        this.property_name = propertyName;
        this.longtidude = longtidude;
        this.latidude = latidude;
        this.city = city;
        this.street = street;
        this.url = url;
        this.fromDate = fromDate;
        this.toDate = toDate;
        if(email){
            this.user = {
                id : userId,
                name : userName,
                email : email
            }
        }
    }


}