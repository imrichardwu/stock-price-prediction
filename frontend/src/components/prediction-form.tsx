"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";

interface PredictionFormProps {
  onPredict: (ticker: string, daysAhead: number) => void;
  loading: boolean;
}

export function PredictionForm({ onPredict, loading }: PredictionFormProps) {
  const [ticker, setTicker] = useState("");
  const [daysAhead, setDaysAhead] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      onPredict(ticker.trim(), daysAhead);
    }
  };

  return (
    <Card className="wealthsimple-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Stock Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="ticker"
              className="text-sm font-medium text-gray-700"
            >
              Stock Ticker Symbol
            </label>
            <Input
              id="ticker"
              type="text"
              placeholder="e.g., AAPL, TSLA, GOOGL"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              className="wealthsimple-input"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="daysAhead"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Prediction Horizon (days)
            </label>
            <select
              id="daysAhead"
              value={daysAhead}
              onChange={(e) => setDaysAhead(Number(e.target.value))}
              className="wealthsimple-input"
              disabled={loading}
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="wealthsimple"
            className="w-full"
            disabled={loading || !ticker.trim()}
          >
            {loading ? "Predicting..." : "Get Prediction"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Popular Stocks
          </h4>
          <div className="flex flex-wrap gap-2">
            {["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN"].map((symbol) => (
              <button
                key={symbol}
                onClick={() => setTicker(symbol)}
                className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
