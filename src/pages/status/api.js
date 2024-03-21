import { utils, writeFile } from 'xlsx';

const api = {
    exportExcel: () => {
        // JSON to sheet
        const ws = utils.json_to_sheet([
            { s: 1, t: 2 },
            { s: 3, t: 4 },
        ], { header: ["s", "t"] });
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFile(wb, "SheetJS.xlsx");
    }
}
export default api;