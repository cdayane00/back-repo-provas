"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class appError {
    constructor(log = 'Something went wrong', statusCode = 400, message = 'Something went wrong', detail = 'an unexpected error ocurred') {
        this.log = log;
        this.statusCode = statusCode;
        this.message = message;
        this.detail = detail;
    }
}
exports.default = appError;
