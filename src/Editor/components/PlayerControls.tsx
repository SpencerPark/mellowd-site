import * as React from 'react';
import { MusicPlayerState, CodeState } from "../model";
import Icon from "../../App/components/Icon";
import Label from "../../App/components/Label";

interface PlayerControlButtonProps {
    play: () => any;
    stop: () => any;
    compile: () => any;
}
class PlayerControlButtons extends React.Component<PlayerControlButtonProps, any> {
    render(): JSX.Element|any {
        return (
            <div className="btn-group">
                <button className="editor-button" onClick={() => this.props.play()}>
                    <Icon icon="play"/> Play
                </button>
                <button className="editor-button" onClick={() => this.props.stop()}>
                    <Icon icon="stop"/> Stop
                </button>
                <button className="editor-button" onClick={() => this.props.compile()}>
                    <Icon icon="cloud-upload"/> Compile
                </button>
            </div>
        )
    }
}

class PlayerStateLabel extends React.Component<{state: MusicPlayerState}, any> {
    render(): JSX.Element|any {
        let color, text;
        switch (this.props.state) {
            case MusicPlayerState.LOADING:
                color = 'info';
                text = 'LOADING';
                break;
            case MusicPlayerState.PLAYING:
                color = 'success';
                text = 'PLAYING';
                break;
            case MusicPlayerState.STOPPED:
            default:
                color = 'danger';
                text = 'STOPPED';
                break;
        }

        return (
            <h3 className="status-label">Player: <Label color={color} text={text}/></h3>
        )
    }
}

class CodeStateLabel extends React.Component<{state: CodeState}, any> {
    render(): JSX.Element|any {
        let color, text;
        switch (this.props.state) {
            case CodeState.COMPILED:
                color = 'success';
                text = 'COMPILED';
                break;
            case CodeState.COMPILING:
                color = 'info';
                text = 'COMPILING';
                break;
            case CodeState.ERROR:
                color = 'danger';
                text = 'ERROR';
                break;
            case CodeState.NOT_COMPILED:
            default:
                color = 'danger';
                text = 'NOT_COMPILED';
                break;
        }

        return (
            <h3 className="status-label">Code: <Label color={color} text={text}/></h3>
        )
    }
}

export { PlayerControlButtons, PlayerStateLabel, CodeStateLabel };