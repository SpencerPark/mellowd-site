import * as CodeMirror from "codemirror";

import "../mellowd";

import "codemirror/addon/runmode/runmode";

export namespace Wiki {
    export function mountCodeComponent(element: HTMLDivElement, displayCode: string, realCode: string,) {
        let pre = document.createElement('pre');
        pre.className = "cm-s-ambiance";
        pre.setAttribute("style", "cursor: pointer");
        element.appendChild(pre);

        (CodeMirror as any).runMode(displayCode, 'mellowd', pre);
    }

    export const TRY_CODE_CLASS_NAME = "try-mellowd";

    export function mountAll() {
        let codeBlocks = document.getElementsByClassName(TRY_CODE_CLASS_NAME);
        for (let i = 0; i < codeBlocks.length; i++) {
            let codeBlock = codeBlocks[i] as HTMLDivElement;
            let displayCodeElement = codeBlock.children[0] as HTMLPreElement;
            let realCodeElement = codeBlock.children[1] as HTMLPreElement;

            let displayCode = displayCodeElement.innerText;
            let realCode = realCodeElement.innerText;

            codeBlock.removeChild(displayCodeElement);
            codeBlock.removeChild(realCodeElement);

            mountCodeComponent(codeBlock, displayCode, realCode);
        }
    }
}

Wiki.mountAll();