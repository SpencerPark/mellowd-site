import * as React from 'react';

interface IconProps {
    icon: string;
}

class Icon extends React.Component<IconProps, any> {
    render(): JSX.Element|any {
        return <span className={"glyphicon glyphicon-" + this.props.icon}/>;
    }
}

export default Icon;