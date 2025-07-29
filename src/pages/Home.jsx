import React from "react";
import { Banknote, CreditCard, Lock, Send, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-blue-100 pt-24 px-4 md:px-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to E-BANK
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Your trusted digital bank for secure, fast and simple transactions.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        <FeatureCard
          icon={<Banknote className="w-10 h-10 text-blue-700" />}
          title="Easy Transfers"
          description="Send and receive money instantly with low fees."
        />
        <FeatureCard
          icon={<Lock className="w-10 h-10 text-blue-700" />}
          title="Secure Banking"
          description="We use advanced encryption and multi-factor authentication."
        />
        <FeatureCard
          icon={<CreditCard className="w-10 h-10 text-blue-700" />}
          title="Virtual Cards"
          description="Create virtual debit or credit cards on demand."
        />
        <FeatureCard
          icon={<Send className="w-10 h-10 text-blue-700" />}
          title="International Payments"
          description="Transfer funds globally in just a few clicks."
        />
        <FeatureCard
          icon={<UserCheck className="w-10 h-10 text-blue-700" />}
          title="24/7 Support"
          description="Get help whenever you need it with our support team."
        />
      </section>

      {/* CTA */}
      <section className="mt-20 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-md transition-all"
        >
          Get Started
        </motion.button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
