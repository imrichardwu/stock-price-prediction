export interface PredictionData {
  ticker: string;
  current_price: number;
  predicted_price: number;
  price_change: number;
  price_change_percent: number;
  confidence: number;
  prediction_date: string;
  recommendation: string;
  risk_level: string;
  historical_data: HistoricalDataPoint[];
  prediction_interval: {
    lower: number;
    upper: number;
  };
  model_accuracy: number;
}

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PredictionRequest {
  ticker: string;
  days_ahead?: number;
  confidence_level?: number;
}


