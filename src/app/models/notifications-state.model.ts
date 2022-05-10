import { Action } from '@ngrx/store';
import { Notifications } from './notifications.model';

// ESTADO
export interface NotificationsState {
    notifications: Notifications[];
    errmess: string;
    isLoading: boolean;
}
export interface Error {
    message: string;
}

export const intializeNotificationsState = () => {
    return {
        isLoading: false,
        notifications: null,
        errmess: null
    }
};

// ACCIONES
export enum NotificationsActionTypes {
    NOTIFICATIONS_REQUEST = '[Notifications] Request',
    NOTIFICATIONS_FAILED = '[Notifications] Failed',
    NOTIFICATIONS_SUCCESS = '[Notifications] Success'
}

export class NotificationsRequest implements Action {
    type = NotificationsActionTypes.NOTIFICATIONS_REQUEST
    constructor() { }
}

export class NotificationsFailed implements Action {
    type = NotificationsActionTypes.NOTIFICATIONS_FAILED
    constructor(public error: Error) { }
}

export class NotificationsSuccess implements Action {
    type = NotificationsActionTypes.NOTIFICATIONS_SUCCESS
    constructor(public notifications: Notifications[]) { }
}


export type NotificationsActions = NotificationsRequest | NotificationsFailed
    | NotificationsSuccess;

// REDUCERS
export function reducerNotifications(
    state: NotificationsState,
    action: NotificationsActions
): NotificationsState {
    switch (action.type) {
        case NotificationsActionTypes.NOTIFICATIONS_REQUEST: {
            return {
                ...state,
                notifications: null,
                errmess: '',
                isLoading: true
            }
        }
        case NotificationsActionTypes.NOTIFICATIONS_SUCCESS: {
            return {
                ...state,
                notifications: (action as NotificationsSuccess).notifications,
                errmess: '',
                isLoading: false
            }
        }
        case NotificationsActionTypes.NOTIFICATIONS_FAILED: {
            return {
                ...state,
                errmess: 'Error al devolver la informacion',
                isLoading: false,
                notifications: null
              }
        }
    }
    return state;
}
