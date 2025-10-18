"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="wealthsimple-card border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Prediction Error
              </h3>
              <p className="text-sm text-red-700 mt-1">{message}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


