import * as React from 'react';
import { LabelContextualColor } from "../semantics";

interface LabelProps {
    color: LabelContextualColor
    text: string
}
class Label extends React.Component<LabelProps, any> {
    render(): JSX.Element|any {
        return (
            <span className={"label label-" + this.props.color}>{this.props.text}</span>
        )
    }
}

export default Label;