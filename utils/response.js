module.exports = class Response{

    /**
     * Executes a promise and sends a result depending on the result
     * @param {Response} res - Express response
     * @param {function} promiseFunc - function that returns a promise
     */
    static async execPromise(res, promiseFunc){
        try{
            //exec promise
            let res = await promiseFunc();
            Response.sendResponse(res, true, res);
        }catch(e){
            Response.sendResponse(res, false, null, "Error");
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