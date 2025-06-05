import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function SuccessMessage({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="fixed top-20 right-10 bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3"
    >
      <CheckCircle2 size={28} className="text-green-600" />
      <p className="text-lg font-semibold">Company Added Successfully!</p>
      <button
        onClick={onClose}
        className="ml-4 px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        ✖
      </button>
    </motion.div>
  );
}
