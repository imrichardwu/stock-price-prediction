"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Loader2 } from "lucide-react";

interface PredictionFormProps {
  onPredict: (ticker: string) => void;
  isLoading: boolean;
}

export function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      onPredict(ticker.trim().toUpperCase());
    }
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Trading Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              onChange={(e) => setTicker(e.target.value)}
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-full"
            disabled={isLoading || !ticker.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Get Trading Signal"
            )}
          </Button>
        </form>
        <div className="mt-4 text-xs text-gray-500">
          <p>Get clear BUY, SELL, or HOLD recommendations</p>
        </div>
      </CardContent>
    </Card>
  );
}
