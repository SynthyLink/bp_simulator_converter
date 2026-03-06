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
export declare function importPointsFromCSV(list: FileList, progress?: HTMLProgressElement): Promise<Array<Float32Array>>;
//# sourceMappingURL=csv-import.d.ts.map