import * as React from 'react';

import { Message as MessageContents, MessageType } from '../model';
import Alert from "../../App/components/Alert";
import { AlertContextualColor } from "../../App/semantics";

interface MessageProps {
    message: MessageContents;
    onDismiss?: () => any;
}

interface MessageState {
    extended: boolean;
}

class Message extends React.Component<MessageProps, MessageState> {
    constructor(props) {
        super(props);
        this.state = {
            extended: false
        }
    }

    public setExtended(extended: boolean) {
        if (!this.props.message.expandable) return;
        this.setState({extended: extended});
    }

    private renderContent(): any {
        if (!this.props.message.body) {
            return null;
        } else if (typeof this.props.message.body === 'string') {
            return <p>{this.props.message.body}</p>;
        } else {
            let content = [];

            let i = 0;
            for (let msg of this.props.message.body)
                content.push(<li key={i++}>{msg}</li>);

            return (<ul>{content}</ul>);
        }
    }

    private static getColor(type: MessageType): AlertContextualColor {
        switch (type) {
            case MessageType.ERROR:
                return "danger";
            case MessageType.WARNING:
                return "warning";
            default:
            case MessageType.INFO:
                return "info";
            case MessageType.SUCCESS:
                return "success";
        }
    }

    render(): JSX.Element|any {
        const {message, onDismiss} = this.props;

        return (
            <Alert color={Message.getColor(message.type)} onDismiss={onDismiss}>
                <strong style={{cursor: message.expandable ? 'pointer' : 'default'}}
                        onClick={() => this.setExtended(!this.state.extended)}>
                    {this.props.message.header}
                </strong>

                { !message.expandable || this.state.extended ? this.renderContent() : null }
            </Alert>
        )
    }
}

export default Message;