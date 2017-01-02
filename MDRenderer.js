const marked = require('marked'),
      escape = require('escape-html');
const MDRenderer = new marked.Renderer();


const HIDE_LINE = /^!(.*(?:(?:\n\r?)|$))/gm;
MDRenderer.code = function (code, language) {
    const realCode = code.replace(HIDE_LINE, '$1');
    const displayCode = code.replace(HIDE_LINE, '');
    return `<div class="try-mellowd">
                <pre>${escape(displayCode)}</pre>
                <pre style="display: none;">${escape(realCode)}</pre>
            </div>\n`;
};

MDRenderer.heading = function (text, level, raw) {
    /*text = ' ' + text;
    for (let i = 0; i < level; i++) {
        text = '#' + text;
    }
    */return `<h${level} id="${raw.toLowerCase().replace(/[^\w]+/g, '-')}">${text}</h${level}>\n`;
};

MDRenderer.strong = function (text) {
    return `<strong>**${text}**</strong>`
};

MDRenderer.em = function (text) {
    return `<em>_${text}_</em>`
};

MDRenderer.codespan = function(text) {
    return '`<code>' + text + '</code>`';
};

const ALERT = /^!(success|info|warning|danger)!/;
const LEAD = /^!lead!/;
MDRenderer.paragraph = function (text) {
    let alertType = ALERT.exec(text);
    if (alertType != null) {
        return `<div class="alert alert-${alertType[1]}" role="alert">${text.substr(2 + alertType[1].length)}</div>\n`;
    } else if (LEAD.test(text)) {
        return `<p class="lead">${text.substr(6)}</p>`
    }
    return `<p>${text}</p>\n`
};

MDRenderer.table = function (header, body) {
    return `<table class="table">
                <thead>
                    ${header}
                </thead>
                <tbody>
                    ${body}
                </tbody>
            </table>\n`;
};

const superLink = MDRenderer.link;
MDRenderer.link = function(href, title, text) {
    if (href === '!tt!') {
        return `<span data-toggle="tooltip" data-placement="top" title="${title}">
                    ${text}
                </span>`;
    }
    return superLink.call(MDRenderer, href, title, text);
};
module.exports = MDRenderer;