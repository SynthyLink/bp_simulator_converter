export interface IObjectTransformer
{
    getInput(): string[];
    getOutput(): string[];
    getInputType(i: number): unknown;
    getOutputType(i: number): unknown;

    calculate(input: [], output: []): void;


}