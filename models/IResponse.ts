export interface IResponse<T>{
    data?: T;
    error?: string;
    message?: string;
}