import * as React from 'react';

class LandingPage extends React.Component<any, any> {

    render(): JSX.Element|any {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <img src="public/assets/img/logo.png" className="img-fluid" alt="Responsive image"/>
                    <p>A language for writing music with code!</p>
                </div>
                <div className="col-xs-6">
                    EDITOR
                </div>
            </div>
        )
    }
}

export default LandingPage;