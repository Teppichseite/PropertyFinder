const { validationResult } = require('express-validator');

const INVALID_REQUEST_ERROR_MSG = "invalid_request_parameters";
const DEFAULT_ERROR_MSG = "some_error_occurred";

module.exports = class ResponseWrapper{

    /**
     * Executes a promise and sends a result depending on the result
     * also checks for validation errors
     * @param {Request} req - Express Request
     * @param {Response} res - Express response
     * @param {function} promiseFunc - function that returns a promise
     */
    static async execPromise(req, res, promiseFunc){

        //check errors
        if(ResponseWrapper.hasValidationErrors(req, res)){
            return;
        }

        try{
            //exec promise
            let result = await promiseFunc();
            ResponseWrapper.sendResponse(res, true, result);
        }catch(e){
            console.log(e);
            ResponseWrapper.sendResponse(res, false, null, DEFAULT_ERROR_MSG);
        }
    }

    /**
     * If there are validation errors from express-validator, 
     * an error message will be sent and true will be returned
     * @param {Request} req - Express Request
     * @param {Response} res - Express response
     * @returns {boolean}
     */
    static hasValidationErrors(req, res){
        const validationErrors = validationResult(req);
        console.log(validationErrors);
        if(!validationErrors.isEmpty()){
            ResponseWrapper.sendResponse(res, false, null, INVALID_REQUEST_ERROR_MSG);
            return true;
        } 
        return false;
    }

    /**
     * Sends a response
     * @param {Response} res - Express response
     * @param {boolean} isSuccess 
     * @param {any} data - if successs is true then this data will be sent
     * @param {String} errorMessage  - if successs is false then data will be not sent
     * and this errorMessage instead
     */
    static sendResponse(res, isSuccess, data, errorMessage){
        let respObj = {
            success : isSuccess,
        };

        let statusCode;

        if(isSuccess){
            if(data){
                respObj.result = data;
            }
            statusCode = 200;
        }else{
            if(errorMessage){
                respObj.error = errorMessage;
            }
            statusCode = 400;
        }

        res.status(statusCode).json(respObj);
    }

}