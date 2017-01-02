import { handleActions } from 'redux-actions';

import * as Immutable from 'immutable';
import { assign } from 'lodash';

import {
    DEFAULT_EDITOR_STATE, ErrorResponse, EditorState, MessageType, ErrorResponseType, CodeState
} from "./model";

import {
    ADD_ERRORS, CLEAR_ERRORS, DISMISS_MESSAGE, AddErrorsAction, ClearErrorsAction,
    DismissMessageAction, ADD_MESSAGE, AddMessageAction, SET_MUSIC_DATA, SET_PLAYER_STATE, SetMusicDataAction,
    SetPlayerStateAction
} from "./actions";

const addErrors = (oldState: EditorState, action: AddErrorsAction): EditorState => {
    const startingID = oldState.nextMessageID;
    return assign({}, oldState, {
        nextMessageID: startingID + action.payload.length,
        errors: oldState.errors.withMutations((errors) => {
            action.payload.forEach((err: ErrorResponse, index: number) => {
                err.messageId = startingID + index;
                errors.push(err);
            })
        }),
        messages: oldState.messages.withMutations((messages) => {
            action.payload.forEach((err: ErrorResponse, index: number) => {
                let body: string | string[];
                switch (err.type) {
                    case ErrorResponseType.COMPILATION:
                        body = `on line ${err.lineNum} @ ${err.startPosInLine}-${err.startPosInLine + (err.endPos - err.startPos)}`;
                        break;
                    case ErrorResponseType.PARSE:
                        body = err.errorMessages;
                        break;
                    default:
                    case ErrorResponseType.OTHER:
                        body = null;
                        break;
                }

                messages.set(startingID + index, {
                    id: startingID + index,
                    type: MessageType.ERROR,

                    header: err.message,
                    body: body,

                    dismissible: true,
                    expandable: true
                })
            });
        })
    });
};

const clearErrors = (oldState: EditorState, action: ClearErrorsAction): EditorState => {
    const messages = oldState.messages.withMutations((messages) => {
        oldState.errors.forEach((err: ErrorResponse) => {
            if (err.messageId) messages.remove(err.messageId);
        })
    });

    return assign({}, oldState, {
        nextMessageID: messages.size > 0 ? oldState.nextMessageID : 0,
        errors: Immutable.List.of<ErrorResponse>(),
        messages: messages
    });
};

const addMessage = (oldState: EditorState, action: AddMessageAction): EditorState => {
    const toAdd = action.payload;
    return assign({}, oldState, {
        nextMessageID: oldState.nextMessageID + 1,
        messages: oldState.messages.set(oldState.nextMessageID, {
            id: oldState.nextMessageID,
            type: toAdd.type,
            header: toAdd.header,
            body: toAdd.body,
            dismissible: toAdd.dismissible,
            expandable: toAdd.expandable
        })
    });
};

const dismissMessage = (oldState: EditorState, action: DismissMessageAction): EditorState => {
    const messages = oldState.messages.remove(action.payload);
    return assign({}, oldState, {
        nextMessageID: messages.size > 0 ? oldState.nextMessageID : 0,
        messages: messages
    });
};

const setMusicData = (oldState: EditorState, action: SetMusicDataAction): EditorState => {
    if (action.payload) {
        if (typeof action.payload == 'number') {
            return assign({}, oldState, {
                player: assign({}, oldState.player, {
                    codeState: action.payload,
                    song: null
                })
            });
        } else {
            return assign({}, oldState, {
                player: assign({}, oldState.player, {
                    codeState: CodeState.COMPILED,
                    song: {
                        length: action.payload.length,
                        data: action.payload.song
                    }
                })
            });
        }
    } else {
        return assign({}, oldState, {
            player: assign({}, oldState.player, {
                codeState: CodeState.NOT_COMPILED,
                song: null
            })
        });
    }
};

const setPlayerState = (oldState: EditorState, action: SetPlayerStateAction): EditorState => {
    return assign({}, oldState, {
        player: assign({}, oldState.player, {
            musicPlayerState: action.payload
        })
    });
};

export const EditorReducer = handleActions<EditorState, any>({
    [ADD_ERRORS]: addErrors,
    [CLEAR_ERRORS]: clearErrors,
    [ADD_MESSAGE]: addMessage,
    [DISMISS_MESSAGE]: dismissMessage,
    [SET_MUSIC_DATA]: setMusicData,
    [SET_PLAYER_STATE]: setPlayerState
}, DEFAULT_EDITOR_STATE);
