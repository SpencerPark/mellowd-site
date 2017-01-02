import * as React from 'react';

import Icon from "../../App/components/Icon";

import * as CodeMirror from "codemirror";

import "../../mellowd";

import "codemirror/addon/runmode/runmode";

interface CodeSectionProps {
    code: string;
    displayCode: string;
}
class CodeSection extends React.Component<CodeSectionProps, any> {

    componentDidMount(): void {
        (CodeMirror as any).runMode(this.props.displayCode, 'mellowd', this.refs["code-container"] as HTMLPreElement);
    }

    render(): JSX.Element|any {
        //TODO the href should link to /try?params=... using header, inblock, code, footer
        return (
            <div>
                <pre ref="code-container" className="cm-s-default" style={{cursor: 'pointer'}}/>
            </div>
        );
    }
}

export default CodeSection;