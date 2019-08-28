module.exports = class FindPropertiesDto{
    
    /**
     * @param {number} longtidude 
     * @param {number} latidude 
     * @param {String} query - optional
     */
    constructor(longtidude, latidude, query){
        this.longtidude = longtidude;
        this.latidude = latidude;
        this.search_query = query
    }
}