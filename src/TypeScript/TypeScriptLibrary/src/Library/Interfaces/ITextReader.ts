export interface ITextReader {
    readLine(): string
    readToEnd(): string
    eof(): boolean
}