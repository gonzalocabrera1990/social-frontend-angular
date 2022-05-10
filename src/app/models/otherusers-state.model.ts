import { Action } from '@ngrx/store';
import { User } from './user.model';

// ESTADO
export interface OtherUserState {
    otheruser: User;
    isLoading: boolean;
    errmess: string;

}
export interface Erro {
    message: string;
}

export const intializeOtherUserState = function () {
    return {
        otheruser: null,
        isLoading: false,
        errmess: null
    };
};

// ACCIONES
export enum OtherUserActionTypes {
    OTHERUSER_REQUEST = '[Otheruser] Request',
    OTHERUSER_FAILED = '[Otheruser] Failed',
    OTHERUSER_SUCCESS = '[Otheruser] Success'
}

export class OtherUserRequest implements Action {
    type = OtherUserActionTypes.OTHERUSER_REQUEST;
    constructor() { }
}

export class OtherUserSuccess implements Action {
    type = OtherUserActionTypes.OTHERUSER_SUCCESS;
    constructor(public user: User) { }
}

export class OtherUserFailed implements Action {
    type = OtherUserActionTypes.OTHERUSER_FAILED;
    constructor(public error: Erro) { }
}

export type OtherUserActions = OtherUserRequest | OtherUserSuccess
    | OtherUserFailed;

// REDUCERS
export function reducerOtherUser(
    state: OtherUserState,
    action: OtherUserActions
): OtherUserState {
    switch (action.type) {
        case OtherUserActionTypes.OTHERUSER_REQUEST: {
            return {
                ...state,
                otheruser: null,
                errmess: '',
                isLoading: true

            }
        }
        case OtherUserActionTypes.OTHERUSER_SUCCESS: {
            return {
                ...state,
                otheruser: (action as OtherUserSuccess).user,
                errmess: '',
                isLoading: false

            }
        }
        case OtherUserActionTypes.OTHERUSER_FAILED: {
            return {
                ...state,
                otheruser: null,
                errmess: '',
                isLoading: false

            }
        }
    }
    return state;
}
