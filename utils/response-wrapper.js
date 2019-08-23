const DEFAULT_ERROR_MSG = "some_error_occurred"

module.exports = class ResponseWrapper{

    /**
     * Executes a promise and sends a result depending on the result
     * @param {Response} res - Express response
     * @param {function} promiseFunc - function that returns a promise
     */
    static async execPromise(res, promiseFunc){
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