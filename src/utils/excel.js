import { read, writeFile, utils } from 'xlsx';


export const readExcel = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = async (e) => {
            const ab = e.target.result;
            const wb = read(ab);
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data = utils.sheet_to_json(ws);
            resolve(data);
        };
        reader.onerror = () => {
            reject("Error reading file");
        };
        reader.readAsArrayBuffer(file);
    });
}

export const dumpExcel = (data, filename) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, `${filename}.xlsx`);
}


