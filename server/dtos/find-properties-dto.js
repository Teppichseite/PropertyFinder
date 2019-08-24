module.exports = class FindPropertiesDto{
    constructor(longtidude, latidude, query){
        this.longtidude = longtidude;
        this.latidude = latidude;
        this.search_query = query
    }
}