"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PredictionChart } from "./prediction-chart";
import { PredictionData } from "@/types/prediction";
import {
  formatCurrency,
  formatPercentage,
  getRecommendationColor,
  getRiskLevelColor,
} from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  BarChart3,
} from "lucide-react";

interface PredictionResultsProps {
  data: PredictionData;
}

export function PredictionResults({ data }: PredictionResultsProps) {
  const isPositive = data.price_change > 0;

  return (
    <div className="space-y-6">
      {/* Main Prediction Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="wealthsimple-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{data.ticker}</CardTitle>
                <p className="text-gray-600">Stock Prediction Analysis</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  {isPositive ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                  <Badge variant={isPositive ? "success" : "danger"}>
                    {data.recommendation.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Current Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(data.current_price)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Predicted Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(data.predicted_price)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Expected Change</p>
                <p
                  className={`text-3xl font-bold ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatPercentage(data.price_change_percent)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="wealthsimple-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confidence</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {(data.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="wealthsimple-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Risk Level</p>
                  <p
                    className={`text-xl font-semibold ${getRiskLevelColor(
                      data.risk_level
                    )}`}
                  >
                    {data.risk_level}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="wealthsimple-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Model Accuracy</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {(data.model_accuracy * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="wealthsimple-card">
          <CardHeader>
            <CardTitle>Price Chart & Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <PredictionChart data={data} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Prediction Interval */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="wealthsimple-card">
          <CardHeader>
            <CardTitle>Prediction Interval (95% Confidence)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Lower Bound</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(data.prediction_interval.lower)}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Upper Bound</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatCurrency(data.prediction_interval.upper)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Prediction date:{" "}
              {new Date(data.prediction_date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}


