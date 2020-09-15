function removeEmpty(obj: any): void {
    Object.entries(obj).forEach(([
        key,
        val,
    ]) => {
        if (val && val instanceof Object) {
            removeEmpty(val);
        } else if (val == null) {
            delete obj[key];
        }
    });
}

function allDatesToISOString(obj: any): void {
    Object.entries(obj).forEach(([
        key,
        val,
    ]) => {
        if (val) {
            if (val instanceof Date) {
                obj[key] = val.toISOString();
            } else if (val instanceof Object) {
                allDatesToISOString(val);
            }
        }
    });
}

export { removeEmpty, allDatesToISOString };
