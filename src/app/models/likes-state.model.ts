import { Action } from '@ngrx/store';
import { Likes } from './likes.model';

// ESTADO
export interface LikesState {
    likes: Likes;
    errmess: string;
    isLoading: boolean;
}
export interface Error {
    message: string;
}

export const intializeLikesState = () => {
    return {
        isLoading: false,
        likes: null,
        errmess: null
    }
};

// ACCIONES
export enum LikesActionTypes {
    LIKES_REQUEST = '[Likes] Request',
    LIKES_FAILED = '[Likes] Failed',
    LIKES_SUCCESS = '[Likes] Success'
}

export class LikesRequest implements Action {
    type = LikesActionTypes.LIKES_REQUEST
    constructor() { }
}

export class LikesFailed implements Action {
    type = LikesActionTypes.LIKES_FAILED
    constructor(public error: Error) { }
}

export class LikesSuccess implements Action {
    type = LikesActionTypes.LIKES_SUCCESS
    constructor(public likes: Likes) { }
}


export type LikesActions = LikesRequest | LikesFailed
    | LikesSuccess;

// REDUCERS
export function reducerLikes(
    state: LikesState,
    action: LikesActions
): LikesState {
    switch (action.type) {
        case LikesActionTypes.LIKES_REQUEST: {
            return {
                ...state,
                likes: null,
                errmess: '',
                isLoading: true
            }
        }
        case LikesActionTypes.LIKES_SUCCESS: {
            return {
                ...state,
                likes: (action as LikesSuccess).likes,
                errmess: '',
                isLoading: false
            }
        }
        case LikesActionTypes.LIKES_FAILED: {
            return {
                ...state,
                errmess: 'Error al devolver la informacion',
                isLoading: false,
                likes: null
              }
        }
    }
    return state;
}
