import type { OrbitalForecastItemNumber } from "../Algorithms/OrbitalForecastCalculation/OrbitalData";

export interface ServerClientComparisonPoint {
    sample: number;
    time: number;
    serverX: number;
    clientX: number;
    serverY: number;
    clientY: number;
    serverZ: number;
    clientZ: number;
    serverVx: number;
    clientVx: number;
    serverVy: number;
    clientVy: number;
    serverVz: number;
    clientVz: number;
}

export function createServerClientComparisonData(
    server: OrbitalForecastItemNumber[],
    client: OrbitalForecastItemNumber[],
): ServerClientComparisonPoint[] {
    const pointCount = Math.min(server.length, client.length);

    return Array.from({ length: pointCount }, (_, index) => ({
        sample: index + 1,
        time: server[index].orbitalTime,
        serverX: server[index].x,
        clientX: client[index].x,
        serverY: server[index].y,
        clientY: client[index].y,
        serverZ: server[index].z,
        clientZ: client[index].z,
        serverVx: server[index].vx,
        clientVx: client[index].vx,
        serverVy: server[index].vy,
        clientVy: client[index].vy,
        serverVz: server[index].vz,
        clientVz: client[index].vz,
    }));
}
