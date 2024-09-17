"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inactive = exports.conflict = exports.notAuthorized = exports.notAllowed = exports.requestInvalid = exports.serverError = exports.notFound = exports.dataNotFound = exports.success = void 0;
const statusCodes = require("../shared/constants/httpCodes");
const success = (data, count = 0) => {
    if (count > 0) {
        return {
            statusCode: statusCodes.SUCCESS,
            message: 'Success',
            data: data,
            count: count,
        };
    }
    else {
        return {
            statusCode: statusCodes.SUCCESS,
            message: 'Success',
            data: data,
        };
    }
};
exports.success = success;
const dataNotFound = (message = 'Data not found') => {
    return {
        statusCode: statusCodes.NO_DATA_FOUND,
        message: message,
        data: [],
    };
};
exports.dataNotFound = dataNotFound;
const notFound = (message = 'Not found') => {
    return {
        statusCode: statusCodes.NOT_FOUND,
        message: message,
        data: [],
    };
};
exports.notFound = notFound;
const serverError = (error = 'An Error Occurred. Please contact an admin.') => {
    return {
        statusCode: statusCodes.ERROR,
        message: error,
        data: [],
        error: 'Internal Server error',
    };
};
exports.serverError = serverError;
const requestInvalid = (message) => {
    return {
        statusCode: statusCodes.REQUEST_ERROR,
        message: message,
        data: [],
        error: 'Bad Request',
    };
};
exports.requestInvalid = requestInvalid;
const notAllowed = (message = 'You are not allowed to do this operation') => {
    return {
        statusCode: statusCodes.NOT_ALLOWED,
        message: message,
        data: [],
        error: 'Not allowed',
    };
};
exports.notAllowed = notAllowed;
const notAuthorized = (message = 'You are not authorized to do this operation') => {
    return {
        statusCode: statusCodes.UNAUTHORIZED,
        message: message,
        data: [],
        error: 'Not Authorized',
    };
};
exports.notAuthorized = notAuthorized;
const conflict = (message) => {
    return {
        statusCode: statusCodes.CONFLICT,
        message: message,
        data: [],
        error: 'Duplicate Value',
    };
};
exports.conflict = conflict;
const inactive = (message) => {
    return {
        statusCode: statusCodes.INACTIVE,
        message: message,
        data: [],
        error: 'Inactive',
    };
};
exports.inactive = inactive;
//# sourceMappingURL=http.js.map