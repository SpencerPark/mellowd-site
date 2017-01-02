const path = require("path"),
    through = require("through2"),
    marked = require("marked"),
    MDRenderer = require("./MDRenderer");

module.exports = function () {
    let transform = function (file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        let contents = file.contents.toString("utf8");

        marked.setOptions({
            renderer: MDRenderer
        });

        let name = path.basename(file.path);
        name = name.substr(0, name.length - 3);
        file.path = path.dirname(file.path) + path.sep + name + ".html";

        contents = marked(contents);

        let output = `<html>
<head>
    <title>${name}</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.0/codemirror.min.css" integrity="sha256-B4lcRQIA/hXjqRxuZHImRuHmb0IT1kscrY9mYJ7FsMs=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.0/theme/ambiance.min.css" integrity="sha256-ktyzhaUskWVTfFHilWbMGjsiXmi7GZkOXbOMW6wpt5w=" crossorigin="anonymous" />
    
    <link type="text/css" rel="stylesheet" href="../public/css/wiki.css"/>
</head>
<body>
    <div class="container">
        ${contents}
    </div>
    <script type="text/javascript" src="../wiki.js"></script>
</body>
</html>`;

        file.contents = new Buffer(output);

        callback(null, file);
    };

    return through.obj(transform);
};
