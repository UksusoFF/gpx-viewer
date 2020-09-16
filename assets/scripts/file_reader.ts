class FileReaderController {

    constructor(
        private input: HTMLInputElement,
        private changed: (content: string | null, name: string | null) => void
    ) {
        this.input.onchange = (): void => {
            let file = this.input.files !== null && this.input.files[0] !== null ? this.input.files[0] : null;
            let name = file?.name ?? null;

            if (file !== null) {
                let reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = (): void => {
                    if (reader.result !== null) {
                        this.changed(reader.result.toString(), name);
                    } else {
                        this.changed(null, null);
                    }
                };
                reader.onerror = (): void => {
                    this.changed(null, null);
                };
            } else {
                this.changed(null, null);
            }
        };
    }
}

export default FileReaderController;
