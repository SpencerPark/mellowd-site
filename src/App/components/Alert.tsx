import * as React from 'react';
import { AlertContextualColor } from "../semantics";

interface AlertProps {
    color: AlertContextualColor

    onDismiss?: () => any;
}
class Alert extends React.Component<AlertProps, any> {
    render(): JSX.Element|any {
        return (
            <div className={"alert alert-" + this.props.color + (this.props.onDismiss ? " alert-dismissible" : "")}
                 role="alert">
                { this.props.onDismiss ?
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                            onClick={this.props.onDismiss}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    : null
                }
                { this.props.children }
            </div>
        )
    }
}

export default Alert;