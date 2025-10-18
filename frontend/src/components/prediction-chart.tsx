"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { PredictionData } from "@/types/prediction";
import { formatCurrency } from "@/lib/utils";

interface PredictionChartProps {
  data: PredictionData;
}

export function PredictionChart({ data }: PredictionChartProps) {
  // Prepare chart data
  const chartData = data.historical_data.map((point, index) => ({
    ...point,
    date: new Date(point.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    isPrediction: false,
  }));

  // Add prediction point
  const lastDate = new Date(
    data.historical_data[data.historical_data.length - 1].date
  );
  const predictionDate = new Date(data.prediction_date);

  chartData.push({
    date: predictionDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    close: data.predicted_price,
    open: data.predicted_price,
    high: data.prediction_interval.upper,
    low: data.prediction_interval.lower,
    volume: 0,
    isPrediction: true,
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-gray-600">
            Price: {formatCurrency(data.close)}
          </p>
          {data.isPrediction && (
            <p className="text-xs text-blue-600 font-medium">Prediction</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="h-96 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Historical data line */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#3b82f6" }}
            connectNulls={false}
          />

          {/* Prediction interval */}
          <Line
            type="monotone"
            dataKey="high"
            stroke="#10b981"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#10b981"
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-500"></div>
          <span className="text-gray-600">Historical Price</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-green-500 border-dashed border border-green-500"></div>
          <span className="text-gray-600">Prediction Interval</span>
        </div>
      </div>
    </motion.div>
  );
}


