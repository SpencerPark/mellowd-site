import { createAction, Action } from 'redux-actions';
import { ErrorResponse, MusicPlayerState, MessageType, CodeState } from "./model";

export const ADD_ERRORS = 'ADD_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE';

export const SET_MUSIC_DATA = 'SET_MUSIC_DATA';
export const SET_PLAYER_STATE = 'SET_PLAYER_STATE';

export type AddErrorsAction = Action<ErrorResponse[]>;
export const createAddErrors = createAction<ErrorResponse[]>(ADD_ERRORS);

export type ClearErrorsAction = Action<void>;
export const createClearErrors = createAction<void>(CLEAR_ERRORS);

export interface Message {
    type: MessageType;

    header: string;
    body?: string | string[];

    dismissible?: boolean;
    expandable?: boolean;
}
export type AddMessageAction = Action<Message>;
export const createAddMessage = createAction<Message>(ADD_MESSAGE);

export type DismissMessageAction = Action<number>;
export const createDismissMessage = createAction<number>(DISMISS_MESSAGE);

export interface MusicData {
    song: string;
    length: number;
}
export type SetMusicDataAction = Action<MusicData | CodeState>;
export const createSetMusicData = createAction<MusicData>(SET_MUSIC_DATA);

export type SetPlayerStateAction = Action<MusicPlayerState>;
export const createSetPlayerState = createAction<MusicPlayerState>(SET_PLAYER_STATE);