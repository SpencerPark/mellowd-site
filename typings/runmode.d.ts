declare namespace CodeMirror {
    type OutputPrinter = (tokenText: string, tokenStyleClass: string) => any;

    function runMode(text: string, mode: any, output: OutputPrinter | Element);
}