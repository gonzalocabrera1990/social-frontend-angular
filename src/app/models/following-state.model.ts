import { Action } from '@ngrx/store';
import { Following } from './following.model';

// ESTADO
export interface FollowingState {
    following: Following[];
    errmess: string;
    isLoading: boolean;
}
export interface Error {
    message: string;
}

export const intializeFollowingState = () => {
    return {
        isLoading: false,
        following: null,
        errmess: null
    }
};

// ACCIONES
export enum FollowingActionTypes {
    FOLLOWING_REQUEST = '[Following] Request',
    FOLLOWING_FAILED = '[Following] Failed',
    FOLLOWING_SUCCESS = '[Following] Success'
}

export class FollowingRequest implements Action {
    type = FollowingActionTypes.FOLLOWING_REQUEST
    constructor() { }
}

export class FollowingFailed implements Action {
    type = FollowingActionTypes.FOLLOWING_FAILED
    constructor(public error: Error) { }
}

export class FollowingSuccess implements Action {
    type = FollowingActionTypes.FOLLOWING_SUCCESS
    constructor(public following: Following[]) { }
}


export type FollowingActions = FollowingRequest | FollowingFailed
    | FollowingSuccess;

// REDUCERS
export function reducerFollowing(
    state: FollowingState,
    action: FollowingActions
): FollowingState {
    switch (action.type) {
        case FollowingActionTypes.FOLLOWING_REQUEST: {
            return {
                ...state,
                following: null,
                errmess: '',
                isLoading: true
            }
        }
        case FollowingActionTypes.FOLLOWING_SUCCESS: {
            return {
                ...state,
                following: (action as FollowingSuccess).following,
                errmess: '',
                isLoading: false
            }
        }
        case FollowingActionTypes.FOLLOWING_FAILED: {
            return {
                ...state,
                errmess: 'Error al devolver la informacion',
                isLoading: false,
                following: null
              }
        }
    }
    return state;
}
