"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="wealthsimple-card">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full"
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Analyzing Stock Data
              </h3>
              <p className="text-gray-600">
                Our AI models are processing the latest market information...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


