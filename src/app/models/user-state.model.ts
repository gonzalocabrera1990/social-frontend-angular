import { Action } from '@ngrx/store';
import { User } from './user.model';

// ESTADO
export interface UserState {
    user: User;
    isLoading: boolean;
    errmess: string;

}
export interface Erro {
    message: string;
}

export const intializeUserState = function () {
    return {
        user: null,
        isLoading: false,
        errmess: null
    };
};

// ACCIONES
export enum UserActionTypes {
    USER_REQUEST = '[User] Request',
    USER_FAILED = '[User] Failed',
    USER_SUCCESS = '[User] Success'
}

export class UserRequest implements Action {
    type = UserActionTypes.USER_REQUEST;
    constructor() { }
}

export class UserSuccess implements Action {
    type = UserActionTypes.USER_SUCCESS;
    constructor(public user: User) { }
}

export class UserFailed implements Action {
    type = UserActionTypes.USER_FAILED;
    constructor(public error: Erro) { }
}

export type UserActions = UserRequest | UserSuccess
    | UserFailed;

// REDUCERS
export function reducerUser(
    state: UserState,
    action: UserActions
): UserState {
    switch (action.type) {
        case UserActionTypes.USER_REQUEST: {
            return {
                ...state,
                user: null,
                errmess: '',
                isLoading: true

            }
        }
        case UserActionTypes.USER_SUCCESS: {
            return {
                ...state,
                user: (action as UserSuccess).user,
                errmess: '',
                isLoading: false

            }
        }
        case UserActionTypes.USER_FAILED: {
            return {
                ...state,
                user: null,
                errmess: '',
                isLoading: false

            }
        }
    }
    return state;
}
