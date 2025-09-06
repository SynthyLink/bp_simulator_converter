export const getOrbitalForecastFromNumberBro = async (
    condition: OrbitalForecastConditionNumber,
): Promise<OrbitalForecastItemNumber[] | null> => {
    const controller = new AbortController();
    console.log('ForecastFromNumber');
    const result = await http_cancel<OrbitalForecastItemNumber[], OrbitalForecastConditionNumber>({
        path: `/orbital`,
        method: "post",
        body: condition,
    }, controller);
    console.log("ok", result.ok);
    console.log("body", result.body);
    if (result.ok && result.body) {
        return result.body;
    } else {
        return null;
    }
};
