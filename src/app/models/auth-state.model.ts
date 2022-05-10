import { Action } from '@ngrx/store';
import { User } from './user.model';

// ESTADO
export interface AuthState {
    user: User;
    errmess: string;
    isLoading: boolean;
    isAuthenticated: boolean;
    token: string;
    id: string;
}
export interface Error {
    message: string;
}
export interface Creds {
    username: string;
    password: string;
}
export const intializeAuthState = () => {
    return {
        isLoading: false,
        isAuthenticated: localStorage.getItem("JWT") ? true : false,
        token: localStorage.getItem("JWT"),
        user: null,
        errmess: null,
        id: localStorage.getItem("ID")
    }
};

// ACCIONES
export enum AuthActionTypes {
    LOGIN_REQUEST = '[Login] Request',
    LOGIN_FAILED = '[Login] Failed',
    LOGIN_SUCCESS = '[Login] Success',
    LOGOUT_REQUEST = '[Logout] Request',
    LOGOUT_FAILED = '[Logout] Failed',
    LOGOUT_SUCCESS = '[Logout] Success',

}

export class LoginRequest implements Action {
    type = AuthActionTypes.LOGIN_REQUEST
    constructor() { }
}

export class LoginFailed implements Action {
    type = AuthActionTypes.LOGIN_FAILED
    constructor(public error: Error) { }
}

export class LoginSuccess implements Action {
    type = AuthActionTypes.LOGIN_SUCCESS
    constructor(public user: User) { }
}

export class LogoutRequest implements Action {
    type = AuthActionTypes.LOGOUT_REQUEST
    constructor(public user: User) { }
}
export class LogoutFailed implements Action {
    type = AuthActionTypes.LOGOUT_FAILED
    constructor(public user: User) { }
}

export class LogoutSuccess implements Action {
    type = AuthActionTypes.LOGOUT_SUCCESS
    constructor(public user: User) { }
}

export type UserActions = LoginRequest | LoginFailed
    | LoginSuccess | LogoutRequest | LogoutFailed | LogoutSuccess;

// REDUCERS
export function reducerAuth(
    state: AuthState,
    action: UserActions
): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN_REQUEST: {
            return {
                ...state,
                user: null,
                errmess: '',
                isLoading: true,
                isAuthenticated: false,
                token: ''

            }
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                user: (action as LoginSuccess).user,
                errmess: '',
                isLoading: false,
                isAuthenticated: true,
                token: ''

            }
        }
        case AuthActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                user: null,
                errmess: '',
                isLoading: false,
                isAuthenticated: false,
                token: ''

            }
        }
    }
    return state;
}
