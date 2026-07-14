import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ServerClientComparisonPoint } from "./orbitalComparisonData";

interface ServerClientComparisonChartProps {
  data: ServerClientComparisonPoint[];
}

type Metric = "X" | "Y" | "Z" | "Vx" | "Vy" | "Vz";

const metrics: Metric[] = ["X", "Y", "Z", "Vx", "Vy", "Vz"];

const formatNumber = (value: number): string =>
  new Intl.NumberFormat(undefined, { maximumSignificantDigits: 7 }).format(
    value,
  );

export function ServerClientComparisonChart({
  data,
}: ServerClientComparisonChartProps) {
  const [metric, setMetric] = useState<Metric>("X");
  const serverKey = `server${metric}` as keyof ServerClientComparisonPoint;
  const clientKey = `client${metric}` as keyof ServerClientComparisonPoint;
  const maximumDifference = useMemo(
    () =>
      data.reduce(
        (maximum, point) =>
          Math.max(
            maximum,
            Math.abs(Number(point[serverKey]) - Number(point[clientKey])),
          ),
        0,
      ),
    [clientKey, data, serverKey],
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <section
      className="comparison-chart"
      aria-labelledby="comparison-chart-title"
    >
      <div className="comparison-chart__header">
        <div>
          <h2 id="comparison-chart-title">Server–client orbital comparison</h2>
          <p>
            {metric} over forecast samples · maximum difference:{" "}
            <strong>{formatNumber(maximumDifference)}</strong>
          </p>
        </div>
        <label>
          Metric
          <select
            value={metric}
            onChange={(event) => setMetric(event.target.value as Metric)}
          >
            {metrics.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="comparison-chart__canvas">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 24, bottom: 8, left: 16 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sample" />
            <YAxis width="auto" tickFormatter={formatNumber} />
            <Tooltip
              contentStyle={{
                backgroundColor:
                  "color-mix(in oklab, var(--background-color) 90%, #000000)",
              }}
              labelFormatter={(label) => `Sample ${String(label)}`}
              formatter={(value) => formatNumber(Number(value))}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={serverKey}
              name="Server"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 3 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey={clientKey}
              name="Client"
              stroke="#dc2626"
              strokeWidth={2}
              strokeDasharray="7 4"
              dot={{ r: 2 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
