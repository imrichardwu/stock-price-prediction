"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import axios from "axios";

interface FearGreedData {
  value: number;
  sentiment: string;
  color: string;
  description: string;
  success: boolean;
}

export function FearGreedIndex() {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get<FearGreedData>(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/fear-greed`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching Fear & Greed Index:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "extreme greed":
      case "greed":
        return <TrendingUp className="h-5 w-5" />;
      case "extreme fear":
      case "fear":
        return <TrendingDown className="h-5 w-5" />;
      default:
        return <Minus className="h-5 w-5" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "extreme greed":
        return "text-green-400";
      case "greed":
        return "text-green-300";
      case "neutral":
        return "text-yellow-400";
      case "fear":
        return "text-orange-400";
      case "extreme fear":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getProgressColor = (value: number) => {
    if (value <= 25) return "bg-red-500";
    if (value <= 45) return "bg-orange-500";
    if (value <= 55) return "bg-yellow-500";
    if (value <= 75) return "bg-green-400";
    return "bg-green-500";
  };

  if (loading) {
    return (
      <Card className="bg-white border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">
              Loading market sentiment...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="bg-white border-gray-200">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            Failed to load Fear & Greed Index
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-900 text-lg flex items-center justify-between">
          <span>Market Sentiment</span>
          <button
            onClick={fetchData}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw className="h-4 w-4 text-gray-500" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {data.value}
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            {getSentimentIcon(data.sentiment)}
            <span
              className={`font-semibold ${getSentimentColor(data.sentiment)}`}
            >
              {data.sentiment}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(
              data.value
            )}`}
            style={{ width: `${data.value}%` }}
          ></div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">{data.description}</p>
        </div>

        {/* Scale */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>Fear</span>
          <span>Neutral</span>
          <span>Greed</span>
        </div>
      </CardContent>
    </Card>
  );
}
