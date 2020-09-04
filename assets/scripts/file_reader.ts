class FileReaderController {

    constructor(
        private input: HTMLInputElement,
        private changed: (content: string | null) => void
    ) {
        this.input.onchange = (): void => {
            let file = this.input.files !== null && this.input.files[0] !== null ? this.input.files[0] : null;

            if (file !== null) {
                let reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = (): void => {
                    if (reader.result !== null) {
                        this.changed(reader.result.toString());
                    } else {
                        this.changed(null);
                    }
                };
                reader.onerror = (): void => {
                    this.changed(null);
                };
            } else {
                this.changed(null);
            }
        };
    }
}

export default FileReaderController;
