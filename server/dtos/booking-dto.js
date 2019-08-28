module.exports = class BookingDto{

    /**
     * @param {String} bookingId 
     * @param {String} propertyId 
     * @param {String} propertyName 
     * @param {number} longtidude 
     * @param {number} latidude 
     * @param {String} city 
     * @param {String} street 
     * @param {String} url 
     * @param {String} fromDate 
     * @param {String} toDate 
     * @param {String} userId - optional
     * @param {String} userName - optional
     * @param {String} email - if !email then the dto 
     * will not contain the user property, optional
     */
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
        this.from_date = fromDate;
        this.to_date = toDate;
        if(email){
            this.user = {
                id : userId,
                name : userName,
                email : email
            }
        }
    }


}