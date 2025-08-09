export interface IDifferentialEquationSolver
{
    /// <summary>
    /// Calculates derivations
    /// </summary>
    CalculateDerivations(): void;

    /// <summary>
    /// Copies variables from processor to solver 
    /// </summary>
    /// <param name="offset">Offset</param>
    /// <param name="variables">Vector of all desktop differential equations variables</param>
    CopyVariablesToSolver(offset: number, variables: number[]): void;

}

