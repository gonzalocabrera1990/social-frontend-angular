import { Action } from '@ngrx/store';
import { Comment } from './comment.model';

// ESTADO
export interface CommentsState {
    comments: Comment[];
    errmess: string;
    isLoading: boolean;
}
export interface Error {
    message: string;
}

export const intializeCommentsState = () => {
    return {
        isLoading: false,
        comments: null,
        errmess: null
    }
};

// ACCIONES
export enum CommentsActionTypes {
    COMMENTS_REQUEST = '[Comments] Request',
    COMMENTS_FAILED = '[Comments] Failed',
    COMMENTS_SUCCESS = '[Comments] Success'
}

export class CommentsRequest implements Action {
    type = CommentsActionTypes.COMMENTS_REQUEST
    constructor() { }
}

export class CommentsFailed implements Action {
    type = CommentsActionTypes.COMMENTS_FAILED
    constructor(public error: Error) { }
}

export class CommentsSuccess implements Action {
    type = CommentsActionTypes.COMMENTS_SUCCESS
    constructor(public comments: Comment[]) { }
}


export type CommentsActions = CommentsRequest | CommentsFailed
    | CommentsSuccess;

// REDUCERS
export function reducerComments(
    state: CommentsState,
    action: CommentsActions
): CommentsState {
    switch (action.type) {
        case CommentsActionTypes.COMMENTS_REQUEST: {
            return {
                ...state,
                comments: null,
                errmess: '',
                isLoading: true
            }
        }
        case CommentsActionTypes.COMMENTS_SUCCESS: {
            return {
                ...state,
                comments: (action as CommentsSuccess).comments,
                errmess: '',
                isLoading: false
            }
        }
        case CommentsActionTypes.COMMENTS_FAILED: {
            return {
                ...state,
                errmess: 'Error al devolver la informacion',
                isLoading: false,
                comments: null
              }
        }
    }
    return state;
}
