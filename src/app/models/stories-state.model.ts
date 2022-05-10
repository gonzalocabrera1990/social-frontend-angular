import { Action } from '@ngrx/store';
import { StoriesFilter } from './imageswall.model';
import { measure } from '../services/helpers/libs';
import { Following } from './following.model';

// ESTADO
export interface StoriesState {
    stories: StoriesFilter;
    errmess: string;
    isLoading: boolean;
}
export interface Error {
    message: string;
}

export const intializeStoriesState = () => {
    return {
        isLoading: false,
        stories: null,
        errmess: null
    }
};

// ACCIONES
export enum StoriesActionTypes {
    STORIES_REQUEST = '[Stories] Request',
    STORIES_FAILED = '[Stories] Failed',
    STORIES_SUCCESS = '[Stories] Success'
}

export class StoriesRequest implements Action {
    type = StoriesActionTypes.STORIES_REQUEST
    constructor() { }
}

export class StoriesFailed implements Action {
    type = StoriesActionTypes.STORIES_FAILED
    constructor(public error: Error) { }
}

export class StoriesSuccess implements Action {
    type = StoriesActionTypes.STORIES_SUCCESS
    constructor(public stories: Following[] ) { }
}


export type StoriesActions = StoriesRequest | StoriesFailed
    | StoriesSuccess;

// REDUCERS
export function reducerStories(
    state: StoriesState,
    action: StoriesActions
): StoriesState {
    switch (action.type) {
        case StoriesActionTypes.STORIES_REQUEST: {
            return {
                ...state,
                stories: null,
                errmess: '',
                isLoading: true
            }
        }
        case StoriesActionTypes.STORIES_SUCCESS: {
            let storageId = localStorage.getItem('ID')
            
            
            let filtrador = (action as StoriesSuccess).stories
            
            let nss = filtrador.filter(us=> us.id.stories[0] && us.id.stories.find(h => measure(h.timestamp) <= 100000 && !h.views.some(v => v === storageId)));
            let ss = filtrador.filter(us=> us.id.stories[0] && us.id.stories.every(h => measure(h.timestamp) <= 100000 && h.views.some(v => v === storageId)));
        
          let measureNoSeenStory = !nss ? null : nss.map(u=>u.id.stories.filter(s=> measure(s.timestamp) <= 100000))
          let filterMeasureNoSeenStory = measureNoSeenStory.filter(n => n.length > 0)
          let measureSeenStory = !ss ? null : ss.map(u=>u.id.stories.filter(s=> measure(s.timestamp) <= 100000))
          let filterMeasureSeenStory = measureSeenStory.filter(n => n.length > 0)
          const storyStore = {
            users: {
              noSeen: nss,
              seen: ss
            },
            stories: {
              noSeen: filterMeasureNoSeenStory,
              seen: filterMeasureSeenStory
            }
          }
            return {
                ...state,
                stories: storyStore,
                errmess: '',
                isLoading: false
            }
        }
        case StoriesActionTypes.STORIES_FAILED: {
            return {
                ...state,
                errmess: 'Error al devolver la informacion',
                isLoading: false,
                stories: null
              }
        }
    }
    return state;
}
