class Error {
    constructor(statusCode, errorMessage) {
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
    static NotFound(errorMessage) {
        return new Error(404, errorMessage);
    }
    static BadRequest(errorMessage) {
        return new Error(400, errorMessage);
    }
    static ServerError(errorMessage){
        return new Error(500, errorMessage);
    }
    static NotAuth(errorMessage){
        return new Error(401, errorMessage);
    }
}

export default Error;