var FileReaderController = (function () {
    function FileReaderController(input, changed) {
        var _this = this;
        this.input = input;
        this.changed = changed;
        this.input.onchange = function () {
            var file = _this.input.files !== null && _this.input.files[0] !== null ? _this.input.files[0] : null;
            if (file !== null) {
                var reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = function () {
                    if (reader.result !== null) {
                        _this.changed(reader.result.toString());
                    }
                    else {
                        _this.changed(null);
                    }
                };
                reader.onerror = function () {
                    _this.changed(null);
                };
            }
            else {
                _this.changed(null);
            }
        };
    }
    return FileReaderController;
})();
exports.FileReaderController = FileReaderController;
