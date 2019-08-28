import PropTypes from 'prop-types';
export default class PropertyDto{
    
    /**
     * @param {String} name 
     * @param {number} longtidude 
     * @param {number} latidude 
     * @param {String} url 
     * @param {String} city 
     * @param {String} street 
     * @param {String} distance 
     */
    constructor(name, longtidude, latidude, url, city, street, distance){
        this.name = name;
        this.longtidude = longtidude;
        this.latidude = latidude;
        this.url = url;
        this.city = city;
        this.street = street;
        this.distance = distance;
    }

    static PropType(){
        return PropTypes.shape({
            name : PropTypes.string,
            longtidude : PropTypes.number,
            latidude : PropTypes.number,
            url : PropTypes.string,
            city : PropTypes.string,
            street : PropTypes.string,
            distance : PropTypes.string,
        });
    }

}