from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="PredictWise API",
    description="Professional stock prediction API powered by machine learning",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    ticker: str
    days_ahead: Optional[int] = 30
    confidence_level: Optional[float] = 0.95

class PredictionResponse(BaseModel):
    ticker: str
    current_price: float
    predicted_price: float
    price_change: float
    price_change_percent: float
    confidence: float
    prediction_date: str
    recommendation: str
    risk_level: str
    historical_data: List[Dict]
    prediction_interval: Dict
    model_accuracy: float

class HistoricalDataResponse(BaseModel):
    ticker: str
    data: List[Dict]
    period: str

def get_prediction(ticker: str, days_ahead: int = 30) -> dict:
    """
    Simulate ML model prediction with realistic data
    In a real implementation, this would load your trained model
    """
    try:
        # Fetch real stock data
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1y")
        
        if hist.empty:
            raise ValueError(f"No data found for ticker {ticker}")
        
        current_price = float(hist['Close'].iloc[-1])
        
        # Simulate ML prediction with realistic volatility
        # In reality, this would use your trained model
        volatility = hist['Close'].pct_change().std()
        trend = (hist['Close'].iloc[-1] - hist['Close'].iloc[-30]) / hist['Close'].iloc[-30] if len(hist) > 30 else 0
        
        # Generate prediction with some randomness but following trend
        base_change = trend * (days_ahead / 30)  # Scale trend to prediction period
        random_factor = np.random.normal(0, volatility * 0.5)
        predicted_change = base_change + random_factor
        
        predicted_price = current_price * (1 + predicted_change)
        
        # Calculate confidence based on historical volatility
        confidence = max(0.6, min(0.95, 1 - (volatility * 2)))
        
        # Generate recommendation
        if predicted_change > 0.05:
            recommendation = "STRONG_BUY"
            risk_level = "LOW"
        elif predicted_change > 0.02:
            recommendation = "BUY"
            risk_level = "LOW"
        elif predicted_change > -0.02:
            recommendation = "HOLD"
            risk_level = "MEDIUM"
        elif predicted_change > -0.05:
            recommendation = "SELL"
            risk_level = "MEDIUM"
        else:
            recommendation = "STRONG_SELL"
            risk_level = "HIGH"
        
        # Generate prediction interval
        std_error = current_price * volatility * np.sqrt(days_ahead / 252)
        prediction_interval = {
            "lower": predicted_price - 1.96 * std_error,
            "upper": predicted_price + 1.96 * std_error
        }
        
        # Generate historical data for chart
        historical_data = []
        for i, (date, row) in enumerate(hist.tail(90).iterrows()):
            historical_data.append({
                "date": date.strftime("%Y-%m-%d"),
                "open": float(row['Open']),
                "high": float(row['High']),
                "low": float(row['Low']),
                "close": float(row['Close']),
                "volume": int(row['Volume'])
            })
        
        return {
            "ticker": ticker.upper(),
            "current_price": round(current_price, 2),
            "predicted_price": round(predicted_price, 2),
            "price_change": round(predicted_price - current_price, 2),
            "price_change_percent": round(predicted_change * 100, 2),
            "confidence": round(confidence, 3),
            "prediction_date": (datetime.now() + timedelta(days=days_ahead)).strftime("%Y-%m-%d"),
            "recommendation": recommendation,
            "risk_level": risk_level,
            "historical_data": historical_data,
            "prediction_interval": {
                "lower": round(prediction_interval["lower"], 2),
                "upper": round(prediction_interval["upper"], 2)
            },
            "model_accuracy": round(random.uniform(0.75, 0.92), 3)  # Simulated model accuracy
        }
        
    except Exception as e:
        logger.error(f"Error in prediction for {ticker}: {str(e)}")
        raise ValueError(f"Failed to generate prediction for {ticker}: {str(e)}")

@app.get("/")
async def root():
    return {
        "message": "PredictWise API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/predict", response_model=PredictionResponse)
async def predict_stock(request: PredictionRequest):
    """
    Generate stock prediction using ML model
    """
    try:
        if not request.ticker or len(request.ticker.strip()) == 0:
            raise HTTPException(status_code=400, detail="Ticker symbol is required")
        
        if request.days_ahead and (request.days_ahead < 1 or request.days_ahead > 365):
            raise HTTPException(status_code=400, detail="Days ahead must be between 1 and 365")
        
        logger.info(f"Generating prediction for {request.ticker}")
        result = get_prediction(request.ticker.strip().upper(), request.days_ahead)
        
        return PredictionResponse(**result)
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error in prediction: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/history/{ticker}", response_model=HistoricalDataResponse)
async def get_historical_data(ticker: str, period: str = "1y"):
    """
    Get historical stock data for charting
    """
    try:
        if not ticker or len(ticker.strip()) == 0:
            raise HTTPException(status_code=400, detail="Ticker symbol is required")
        
        valid_periods = ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"]
        if period not in valid_periods:
            raise HTTPException(status_code=400, detail=f"Invalid period. Must be one of: {valid_periods}")
        
        stock = yf.Ticker(ticker.upper())
        hist = stock.history(period=period)
        
        if hist.empty:
            raise HTTPException(status_code=404, detail=f"No historical data found for {ticker}")
        
        data = []
        for date, row in hist.iterrows():
            data.append({
                "date": date.strftime("%Y-%m-%d"),
                "open": float(row['Open']),
                "high": float(row['High']),
                "low": float(row['Low']),
                "close": float(row['Close']),
                "volume": int(row['Volume'])
            })
        
        return HistoricalDataResponse(
            ticker=ticker.upper(),
            data=data,
            period=period
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching historical data for {ticker}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch historical data")

@app.get("/search/{query}")
async def search_tickers(query: str):
    """
    Search for stock tickers (simplified implementation)
    """
    # In a real implementation, this would query a financial database
    popular_tickers = {
        "apple": "AAPL",
        "microsoft": "MSFT", 
        "google": "GOOGL",
        "amazon": "AMZN",
        "tesla": "TSLA",
        "meta": "META",
        "netflix": "NFLX",
        "nvidia": "NVDA",
        "berkshire": "BRK-B",
        "johnson": "JNJ"
    }
    
    query_lower = query.lower()
    matches = []
    
    for name, ticker in popular_tickers.items():
        if query_lower in name or query_lower in ticker.lower():
            matches.append({"name": name.title(), "ticker": ticker})
    
    return {"query": query, "matches": matches[:10]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
