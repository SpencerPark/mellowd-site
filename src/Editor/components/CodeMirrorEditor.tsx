import * as React from 'react';

import * as CodeMirror from 'codemirror';

import "../../mellowd";

interface CodeMirrorEditorProps {
    className?: string;
    defaultCode: string;
    [customOption: string]: any
}

class CodeMirrorEditor extends React.Component<CodeMirrorEditorProps & CodeMirror.EditorConfiguration, any> {
    private editor: CodeMirror.EditorFromTextArea;

    public getCodeMirror(): CodeMirror.EditorFromTextArea {
        return this.editor;
    }

    componentDidMount(): void {
        this.editor = CodeMirror.fromTextArea(this.refs['editor'] as HTMLTextAreaElement, this.props);
        this.editor.setSize('100%', '60%');
    }

    componentWillUnmount(): void {
        if (this.editor) {
            this.editor.toTextArea();
        }
    }

    render(): JSX.Element|any {
        return (
            <div className={this.props.className}>
                <textarea ref="editor" defaultValue={this.props.defaultCode} autoComplete="off"/>
            </div>
        )
    }
}

export default CodeMirrorEditor;