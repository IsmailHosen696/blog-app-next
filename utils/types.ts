export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}
export interface userinfo {
    username?: string,
    email: string,
    password: string,
}