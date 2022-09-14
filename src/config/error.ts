class appError {
    log: string;
    statusCode: number;
    message: string;
    detail: string;

    constructor(
        log: string = 'Something went wrong',
        statusCode: number = 400,
        message: string = 'Something went wrong',
        detail: string = 'an unexpected error ocurred'
    ){
        this.log = log;
        this.statusCode = statusCode;
        this.message = message;
        this.detail = detail;
    }
}

export default appError;