import * as React from 'react';
import {
    PlayerState, MusicPlayerState as MusicPlayerModelState, CodeState, MessageType, EditorState,
    ErrorResponse
} from "../model";
import * as PlayerControls from "../components/PlayerControls";
import {
    Message, createSetPlayerState, createAddMessage, MusicData, createAddErrors,
    createSetMusicData
} from "../actions";
import { connect, Dispatch } from "react-redux";

interface MusicPlayerProps {
    getCode?: () => string;
    player?: PlayerState;

    addErrors?: (errors: ErrorResponse[]) => any;
    setMusicData?: (data: MusicData | CodeState) => any;
    setPlayerState?: (state: MusicPlayerModelState) => any;
    addMessage?: (message: Message) => any;
}

interface MusicPlayerState {
    progress: number;
}

class MusicPlayer extends React.Component<MusicPlayerProps, MusicPlayerState> {
    state = {
        progress: 0
    };

    private oldMessageCallback: (msg: string) => void;
    private oldPlayerCallback: (event: MIDIjs.PlaybackEvent) => void;

    componentDidMount(): void {
        const PLAYING_PATTERN = /^Playing:/;
        const LOADING_PATTERN = /^Loading/;
        const STOPPED_PATTERN = /^audioMethod/;

        this.oldMessageCallback = MIDIjs.message_callback;
        MIDIjs.message_callback = (msg) => {
            if (PLAYING_PATTERN.test(msg)) {
                this.setPlayerState(MusicPlayerModelState.PLAYING);
            } else if (LOADING_PATTERN.test(msg)) {
                this.setPlayerState(MusicPlayerModelState.LOADING);
            } else if (STOPPED_PATTERN.test(msg)) {
                this.setPlayerState(MusicPlayerModelState.STOPPED);
            }
        };

        this.oldPlayerCallback = MIDIjs.player_callback;
        MIDIjs.player_callback = (event: MIDIjs.PlaybackEvent) => this.setState({
            //Weird behaviour with the midi player api that resets the time to 0 on completion
            progress: event.time
        });
    }

    private setPlayerState(state: MusicPlayerModelState): void {
        if (this.props.player.musicPlayerState != state)
            this.props.setPlayerState(state);
    }

    componentWillUnmount(): void {
        //Reset the callbacks
        MIDIjs.message_callback = this.oldMessageCallback;
        MIDIjs.player_callback = this.oldPlayerCallback;
    }

    private play = (): void => {
        const player = this.props.player;

        if (player.musicPlayerState != MusicPlayerModelState.STOPPED) return;

        switch (player.codeState) {
            case CodeState.COMPILED:
                MIDIjs.play('data:audio/midi;base64,' + this.props.player.song.data);
                break;
            case CodeState.COMPILING:
                this.props.addMessage({
                    type: MessageType.ERROR,
                    header: 'Code is compiling. Please wait',
                    dismissible: true
                });
                break;
            case CodeState.NOT_COMPILED:
                this.props.addMessage({
                    type: MessageType.ERROR,
                    header: 'Nothing to play',
                    body: 'Source must be compiled before it can be played',
                    expandable: true,
                    dismissible: true
                });
                break;
            case CodeState.ERROR:
            default:
                this.props.addMessage({
                    type: MessageType.ERROR,
                    header: 'Playback canceled',
                    body: 'Errors exist in project',
                    expandable: false,
                    dismissible: true
                });
                break;
        }
    };

    private stop = (): void => {
        MIDIjs.stop();
        this.setState({
            progress: 0
        })
    };

    private compile = (): void => {
        if (this.props.player.codeState == CodeState.COMPILING) return;

        this.props.setMusicData(CodeState.COMPILING);

        const request = new XMLHttpRequest();
        const COMPILER_ENDPOINT = 'https://1220vrb0si.execute-api.us-west-2.amazonaws.com/beta/';

        request.open('POST', COMPILER_ENDPOINT, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                const data = JSON.parse(request.responseText);
                if (data[ "song" ]) {
                    //Success
                    this.props.setMusicData(data);
                    this.props.addMessage({
                        type: MessageType.SUCCESS,
                        header: 'Compilation complete!',
                        body: 'Click play to listen to your compiled code.',
                        expandable: false,
                        dismissible: true
                    })
                } else {
                    //Error in the code, not a real error
                    this.props.setMusicData(CodeState.ERROR);
                    this.props.addErrors([ data ]);
                }
            } else {
                this.props.setMusicData(CodeState.NOT_COMPILED);
                this.props.addMessage({
                    type: MessageType.ERROR,
                    header: 'HTTP Error',
                    body: [
                        'Request status: ' + request.status,
                        'Response: ' + JSON.stringify(request.response)
                    ],
                    expandable: true,
                    dismissible: true
                });
            }
        };

        request.onerror = (event: ErrorEvent) => {
            this.props.setMusicData(null);
            this.props.addMessage({
                type: MessageType.ERROR,
                header: 'HTTP Error',
                body: event.message,
                expandable: true,
                dismissible: true
            });
        };

        request.send(JSON.stringify({
            contents: this.props.getCode(),
            tempo: 120,
            timeSignature: [ 4, 4 ],
        }));
    };

    render(): JSX.Element|any {
        let player = this.props.player;

        let progress = player.musicPlayerState != MusicPlayerModelState.PLAYING ? 0 : (this.state.progress / player.song.length) * 100;
        return (
            <div className="row">
                <div className="col-xs-4">
                    <div className="col-xs-12 editor-panel">
                        <PlayerControls.PlayerStateLabel state={player.musicPlayerState}/>
                        <PlayerControls.CodeStateLabel state={player.codeState}/>
                    </div>
                </div>

                <div className="col-xs-8 editor-panel">
                    <PlayerControls.PlayerControlButtons play={this.play} stop={this.stop}
                                                         compile={this.compile}/>

                    <div className="progress" style={{backgroundColor: 'grey'}}>
                        <div className="progress-bar progress-bar-success" role="progressbar"
                             style={{width: progress+"%"}}>
                            { Math.round(this.state.progress) }s
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect<MusicPlayerProps, MusicPlayerProps, MusicPlayerProps>(
    (state: EditorState): MusicPlayerProps => ({
        player: state.player
    }),
    (dispatch: Dispatch<any>): MusicPlayerProps => ({
        addErrors: (errors: ErrorResponse[]) => dispatch(createAddErrors(errors)),
        setMusicData: (data: MusicData | CodeState) => dispatch(createSetMusicData(data)),
        setPlayerState: (state: MusicPlayerModelState) => dispatch(createSetPlayerState(state)),
        addMessage: (message: Message) => dispatch(createAddMessage(message))
    })
)(MusicPlayer);