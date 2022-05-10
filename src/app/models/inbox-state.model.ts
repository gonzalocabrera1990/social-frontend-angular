import { Action } from '@ngrx/store';
import { Inbox } from './inbox.model';

// ESTADO
export interface InboxState {
    inbox: Inbox[];
    errmess: string;
    isLoading: boolean;
}
export interface Error {
    message: string;
}

export const intializeInboxState = () => {
    return {
        isLoading: false,
        inbox: null,
        errmess: null
    }
};

// ACCIONES
export enum InboxActionTypes {
    INBOX_REQUEST = '[Inbox] Request',
    INBOX_FAILED = '[Inbox] Failed',
    INBOX_SUCCESS = '[Inbox] Success'
}

export class InboxRequest implements Action {
    type = InboxActionTypes.INBOX_REQUEST
    constructor() { }
}

export class InboxFailed implements Action {
    type = InboxActionTypes.INBOX_FAILED
    constructor(public error: Error) { }
}

export class InboxSuccess implements Action {
    type = InboxActionTypes.INBOX_SUCCESS
    constructor(public inbox: Inbox[]) { }
}


export type InboxActions = InboxRequest | InboxFailed
    | InboxSuccess;

// REDUCERS
export function reducerInbox(
    state: InboxState,
    action: InboxActions
): InboxState {
    switch (action.type) {
        case InboxActionTypes.INBOX_REQUEST: {
            return {
                ...state,
                inbox: null,
                errmess: '',
                isLoading: true
            }
        }
        case InboxActionTypes.INBOX_SUCCESS: {
            return {
                ...state,
                inbox: (action as InboxSuccess).inbox,
                errmess: '',
                isLoading: false
            }
        }
        case InboxActionTypes.INBOX_FAILED: {
            return {
                ...state,
                errmess: 'Error al devolver la informacion',
                isLoading: false,
                inbox: null
              }
        }
    }
    return state;
}
