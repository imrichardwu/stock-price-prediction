"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Brain, Shield, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="gold-accent">PredictWise</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing investment decision-making through advanced
            artificial intelligence and machine learning technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              PredictWise was founded with a simple yet ambitious goal: to
              democratize access to professional-grade investment analysis
              through cutting-edge AI technology.
            </p>
            <p className="text-gray-600 mb-6">
              We believe that every investor, regardless of their experience
              level, should have access to sophisticated market analysis and
              predictions that were previously only available to institutional
              investors.
            </p>
            <p className="text-gray-600">
              Our platform combines the latest advances in machine learning,
              natural language processing, and quantitative finance to provide
              accurate, actionable insights for your investment decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="wealthsimple-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Data Collection
                    </h4>
                    <p className="text-sm text-gray-600">
                      We gather real-time market data from multiple sources
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Our models analyze patterns and trends in the data
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Prediction Generation
                    </h4>
                    <p className="text-sm text-gray-600">
                      We generate accurate predictions with confidence intervals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Actionable Insights
                    </h4>
                    <p className="text-sm text-gray-600">
                      You receive clear recommendations and risk assessments
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: TrendingUp,
              title: "Advanced AI Models",
              description:
                "Our machine learning algorithms are trained on vast datasets and continuously improved to provide the most accurate predictions possible.",
            },
            {
              icon: Shield,
              title: "Risk Management",
              description:
                "Every prediction comes with comprehensive risk analysis to help you understand the potential volatility and make informed decisions.",
            },
            {
              icon: Target,
              title: "High Accuracy",
              description:
                "Our models achieve industry-leading accuracy rates, giving you confidence in your investment decisions.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="wealthsimple-card text-center h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="wealthsimple-card border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">
                Important Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-yellow-800">
                <p>
                  <strong>Educational Purpose Only:</strong> The predictions and
                  analysis provided by PredictWise are for educational and
                  informational purposes only. They should not be considered as
                  financial advice, investment recommendations, or a substitute
                  for professional financial consultation.
                </p>
                <p>
                  <strong>No Guarantees:</strong> Past performance does not
                  guarantee future results. Stock market investments carry
                  inherent risks, and you may lose money. All investments
                  involve risk, and you should carefully consider your
                  investment objectives and risk tolerance before making any
                  investment decisions.
                </p>
                <p>
                  <strong>Do Your Own Research:</strong> Always conduct your own
                  research and consider consulting with a qualified financial
                  advisor before making any investment decisions. We encourage
                  you to verify any information and consider multiple sources
                  before investing.
                </p>
                <p>
                  <strong>Technology Limitations:</strong> While our AI models
                  are sophisticated, they are not infallible. Market conditions
                  can change rapidly, and unexpected events can significantly
                  impact stock prices in ways that may not be captured by our
                  models.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}


