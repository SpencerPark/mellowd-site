import * as React from 'react';
import { connect, Dispatch } from "react-redux";

import * as Immutable from 'immutable';

import { Message as MessageContents, EditorState } from "../model";

import Message from "../components/Message";
import { createDismissMessage } from "../actions";
import Icon from "../../App/components/Icon";

interface MessageContainerProps {
    messages?: Immutable.Map<number, MessageContents>;

    removeMessage?: (index: number) => any;
}

class MessageContainer extends React.Component<MessageContainerProps, any> {
    render(): JSX.Element|any {
        let msgs = [];
        this.props.messages.forEach((message: MessageContents, index: number) => {
            msgs[ index ] = <Message key={message.id}
                                     message={message}
                                     onDismiss={message.dismissible ? () => this.props.removeMessage(index) : null}/>
        });

        return (
            <div style={{overflowY: 'auto', display: 'block', minHeight: '60%', maxHeight: '60%'}}>
                {
                    msgs.length > 0 ?
                        msgs :
                        <h2 className="text-center text-muted">
                            <Icon icon='signal'/><br/>
                            No Messages
                        </h2>
                }
            </div>
        )
    }
}

export default connect<MessageContainerProps, MessageContainerProps, MessageContainerProps>(
    (state: EditorState) => ({
        messages: state.messages
    }),
    (dispatch: Dispatch<any>) => ({
        removeMessage: (index: number) => dispatch(createDismissMessage(index))
    })
)(MessageContainer);