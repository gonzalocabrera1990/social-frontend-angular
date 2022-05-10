import { Action } from '@ngrx/store';
import { Followers } from './followers.model';

// ESTADO
export interface FollowersState {
    followers: Followers[];
    errmess: string;
    isLoading: boolean;
}
export interface Error {
    message: string;
}

export const intializeFollowersState = () => {
    return {
        isLoading: false,
        followers: null,
        errmess: null
    }
};

// ACCIONES
export enum FollowersActionTypes {
    FOLLOWERS_REQUEST = '[Followers] Request',
    FOLLOWERS_FAILED = '[Followers] Failed',
    FOLLOWERS_SUCCESS = '[Followers] Success'
}

export class FollowersRequest implements Action {
    type = FollowersActionTypes.FOLLOWERS_REQUEST
    constructor() { }
}

export class FollowersFailed implements Action {
    type = FollowersActionTypes.FOLLOWERS_FAILED
    constructor(public error: Error) { }
}

export class FollowersSuccess implements Action {
    type = FollowersActionTypes.FOLLOWERS_SUCCESS
    constructor(public followers: Followers[]) { }
}


export type FollowersActions = FollowersRequest | FollowersFailed
    | FollowersSuccess;

// REDUCERS
export function reducerFollowers(
    state: FollowersState,
    action: FollowersActions
): FollowersState {
    switch (action.type) {
        case FollowersActionTypes.FOLLOWERS_REQUEST: {
            return {
                ...state,
                followers: null,
                errmess: '',
                isLoading: true
            }
        }
        case FollowersActionTypes.FOLLOWERS_SUCCESS: {
            return {
                ...state,
                followers: (action as FollowersSuccess).followers,
                errmess: '',
                isLoading: false
            }
        }
        case FollowersActionTypes.FOLLOWERS_FAILED: {
            return {
                ...state,
                errmess: 'Error al devolver la informacion',
                isLoading: false,
                followers: null
              }
        }
    }
    return state;
}
