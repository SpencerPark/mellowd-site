import * as React from 'react';

import MessageContainer from './MessageContainer';
import MusicPlayer from './MusicPlayer';

import CodeMirrorEditor from "../components/CodeMirrorEditor";

import "../../mellowd";

class Editor extends React.Component<any, any> {
    render(): JSX.Element|any {
        return (
            <div className="container">
                <div className="row">
                    <CodeMirrorEditor
                        ref="codeeditor"
                        className="col-xs-8"
                        defaultCode={'def block sample\n' +
                                                    '\n' +
                                                    'sample {\n' +
                                                    '    [a, b, c]*<e>\n' +
                                                    '}\n' +
                                                    '\n'
                                        }
                        lineNumbers={true} mode="mellowd" theme="ambiance"
                        allowDropTypeFiles={["text/x-mellowd"]}
                        autoCloseBrackets={true} matchBrackets={true}
                        extraKeys={{
                                        'Cmd-/' : 'toggleComment',
                                        'Ctrl-/' : 'toggleComment'
                                    }}
                    />
                    <div className="col-xs-4 editor-panel">
                        <MessageContainer />
                    </div>
                </div>
                <MusicPlayer getCode={() => (this.refs["codeeditor"] as CodeMirrorEditor).getCodeMirror().getValue()}/>
            </div>
        )
    }
}

export default Editor;