import { Action } from '@ngrx/store';
import { Content } from './content.model';

// ESTADO
export interface ContentState {
    content: Content[];
    errmess: string;
    isLoading: boolean;
}
export interface Error {
    message: string;
}

export const intializeContentState = () => {
    return {
        isLoading: false,
        content: null,
        errmess: null,
    }
};

// ACCIONES
export enum ContentActionTypes {
    CONTENT_REQUEST = '[Content] Request',
    CONTENT_FAILED = '[Content] Failed',
    CONTENT_SUCCESS = '[Content] Success',
}

export class ContentRequest implements Action {
    type = ContentActionTypes.CONTENT_REQUEST
    constructor() { }
}

export class ContentFailed implements Action {
    type = ContentActionTypes.CONTENT_FAILED
    constructor(public error: Error) { }
}

export class ContentSuccess implements Action {
    type = ContentActionTypes.CONTENT_SUCCESS
    constructor(public content: Content[]) { }
}

export type ContentActions = ContentRequest | ContentFailed
    | ContentSuccess;

// REDUCERS
export function reducerContent(
    state: ContentState,
    action: ContentActions
): ContentState {
    switch (action.type) {
        case ContentActionTypes.CONTENT_REQUEST: {
            return {
                ...state,
                content: [],
                errmess: '',
                isLoading: true

            }
        }
        case ContentActionTypes.CONTENT_SUCCESS: {
            return {
                ...state,
                content: (action as ContentSuccess).content,
                errmess: '',
                isLoading: false

            }
        }
        case ContentActionTypes.CONTENT_FAILED: {
            return {
                ...state,
                content: null,
                errmess: '',
                isLoading: false

            }
        }
    }
    return state;
}
