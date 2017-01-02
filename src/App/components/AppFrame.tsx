import * as React from 'react';

class AppFrame extends React.Component<any, any> {
    render(): JSX.Element|any {
        return (
            <div className="container">
                { this.props.children }
            </div>
        );
    }
}

export default AppFrame;