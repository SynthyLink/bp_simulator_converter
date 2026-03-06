"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importPointsFromCSV = importPointsFromCSV;
/**
 * Given a CSV with comma separated (',') values and a head line containing for 'x', 'y', and 'z' identifiers, this
 * identifies the column indices of x, y, and z, ignores all empty lines, and parses floats for every component
 * respectively. Since a file list is expected and processing takes some time, a Promis on an Array of Float32Arrays
 * is created and returned when all CSV files where parsed/imported.
 * ```
 * const input = document.getElementById('input-file')! as HTMLInputElement;
 * input.addEventListener('change', () => {
 *     importPointsFromCSV(input.files!).then(result => console.log(result));
 * });
 * ```
 */
function importPointsFromCSV(list, progress) {
    const files = new Array(list.length);
    if (progress) {
        progress.max = files.length;
        progress.classList.remove('active');
        progress.value = 0;
    }
    for (let i = 0; i < list.length; ++i) {
        files[i] = [list.item(i).name, list.item(i)];
    }
    files.sort();
    const coordinates = new Array(files.length);
    const response = new Promise((resolve, reject) => {
        let waiting = files.length;
        for (let i = 0; i < list.length; ++i) {
            const reader = new FileReader();
            reader.readAsText(files[i][1]);
            reader.onload = (event) => {
                let lines = event.target.result.split(/\r\n|\n/);
                // remove empty lines
                lines = lines.filter((value) => value.trim() !== '');
                // look for x, y, z columns in first line / header
                const columnIdentifier = lines[0].split(',');
                const columnIndices = [
                    columnIdentifier.findIndex((identifier) => identifier === 'x'),
                    columnIdentifier.findIndex((identifier) => identifier === 'y'),
                    columnIdentifier.findIndex((identifier) => identifier === 'z')
                ];
                lines.shift();
                const numCoordinates = lines.length;
                coordinates[i] = new Float32Array(numCoordinates * 3);
                for (let j = 0; j < numCoordinates; ++j) {
                    const values = lines[j].split(',');
                    coordinates[i][j * 3 + 0] = Number.parseFloat(values[columnIndices[0]]);
                    coordinates[i][j * 3 + 1] = Number.parseFloat(values[columnIndices[1]]);
                    coordinates[i][j * 3 + 2] = Number.parseFloat(values[columnIndices[2]]);
                }
                /* Resolve the promise when all coordinates have been loaded. */
                waiting = waiting - 1;
                if (progress) {
                    ++progress.value;
                    progress.style.width = `${progress.value / progress.max * 100.0}%`;
                }
                if (waiting === 0) {
                    resolve(coordinates);
                }
            };
            reader.onerror = (event) => reject(`importing '${files[i][1]} failed`);
        }
    });
    return response;
}
//# sourceMappingURL=csv-import.js.map