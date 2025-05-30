export interface Response<T> {
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
    count?: number;
}
export declare const success: <T>(data: T, count?: number) => Response<T>;
export declare const dataNotFound: (message?: string) => Response<[]>;
export declare const notFound: (message?: string) => Response<[]>;
export declare const serverError: (error?: string) => Response<[]>;
export declare const requestInvalid: (message: string) => Response<[]>;
export declare const notAllowed: (message?: string) => Response<[]>;
export declare const notAuthorized: (message?: string) => Response<[]>;
export declare const conflict: (message: string) => Response<[]>;
export declare const inactive: (message: string) => Response<[]>;
