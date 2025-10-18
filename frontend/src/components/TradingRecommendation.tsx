"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  AlertTriangle,
  DollarSign,
} from "lucide-react";

interface TradingRecommendationProps {
  ticker: string;
  recommendation: string;
  confidence: number;
  priceTarget: number;
  currentPrice: number;
  riskLevel: string;
}

export function TradingRecommendation({
  ticker,
  recommendation,
  confidence,
  priceTarget,
  currentPrice,
  riskLevel,
}: TradingRecommendationProps) {
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "BUY":
        return "text-green-400";
      case "SELL":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "BUY":
        return <TrendingUp className="h-6 w-6" />;
      case "SELL":
        return <TrendingDown className="h-6 w-6" />;
      default:
        return <Minus className="h-6 w-6" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW":
        return "text-green-400";
      case "MEDIUM":
        return "text-yellow-400";
      case "HIGH":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const priceChange = priceTarget - currentPrice;
  const priceChangePercent = (priceChange / currentPrice) * 100;

  return (
    <div className="space-y-6">
      {/* Main Recommendation Card */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 text-2xl flex items-center gap-3">
            {getRecommendationIcon(recommendation)}
            <span className={getRecommendationColor(recommendation)}>
              {recommendation} {ticker}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {(confidence * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-500">Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                ${currentPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">Current Price</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                ${priceTarget.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">Price Target</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200">
            <Target className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">
              Expected {priceChange > 0 ? "gain" : "change"}:
              <span
                className={`ml-1 font-semibold ${
                  priceChange > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {priceChange > 0 ? "+" : ""}
                {priceChangePercent.toFixed(1)}%
              </span>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">Risk Level:</span>
            </div>
            <span className={`font-semibold ${getRiskColor(riskLevel)}`}>
              {riskLevel}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
