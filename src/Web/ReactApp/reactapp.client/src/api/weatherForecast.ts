export interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export async function getWeatherForecasts(): Promise<Forecast[]> {
    const response = await fetch('/weatherforecast');

    if (!response.ok) {
        throw new Error(`Weather forecast request failed: ${response.status}`);
    }

    return response.json();
}
