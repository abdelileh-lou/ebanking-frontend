import React from "react";
import {
  Banknote,
  CreditCard,
  Lock,
  Send,
  UserCheck,
  PieChart,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-blue-100 pt-24 px-4 md:px-12">
      {/* Hero Section */}
      <section className="text-center mb-20 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-blue-900 mb-6"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to <span className="text-blue-600">E-BANK</span>
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg md:text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Revolutionizing your financial experience with speed, security, and
          simplicity. Manage everything from your phone – banking the smart way.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        <FeatureCard
          icon={<Banknote className="w-10 h-10 text-blue-700" />}
          title="Instant Transfers"
          description="Move money between accounts or send to others in seconds."
        />
        <FeatureCard
          icon={<Lock className="w-10 h-10 text-blue-700" />}
          title="End-to-End Security"
          description="Multi-layered protection, encryption, and fraud detection."
        />
        <FeatureCard
          icon={<CreditCard className="w-10 h-10 text-blue-700" />}
          title="Smart Virtual Cards"
          description="Create virtual cards with spending limits for online safety."
        />
        <FeatureCard
          icon={<Send className="w-10 h-10 text-blue-700" />}
          title="Global Payments"
          description="Transfer funds internationally with great exchange rates."
        />
        <FeatureCard
          icon={<UserCheck className="w-10 h-10 text-blue-700" />}
          title="24/7 Customer Support"
          description="Get fast help anytime via chat, phone, or email."
        />
        <FeatureCard
          icon={<PieChart className="w-10 h-10 text-blue-700" />}
          title="Financial Insights"
          description="Track expenses, plan budgets, and set saving goals easily."
        />
        <FeatureCard
          icon={<Smartphone className="w-10 h-10 text-blue-700" />}
          title="Full Mobile Access"
          description="Manage your accounts, cards, and bills directly from your app."
        />
        <FeatureCard
          icon={<ShieldCheck className="w-10 h-10 text-blue-700" />}
          title="Regulatory Compliance"
          description="We are licensed and comply with global financial standards."
        />
      </section>

      {/* Vision Section */}
      <section className="mt-24 max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-800 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Banking Reimagined for the Digital Age
        </motion.h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          At E-BANK, we're building a future where you’re in full control of
          your finances — from anywhere in the world. Our technology-first
          approach ensures fast services, security-first transactions, and a
          customer-centric experience. No long queues, no hidden fees.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-md transition-all mb-24"
        >
          Get Started Now
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
