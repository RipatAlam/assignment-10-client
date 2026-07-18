"use client";

import { motion } from "framer-motion";
import {
  Check,
  Crown,
  Sparkles,
  Star,
  Brain,
  BarChart3,
  FileText,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    button: "Current Plan",
    featured: false,
    features: [
      "Share up to 5 lessons",
      "Read public lessons",
      "Like & Comment",
      "Basic Profile",
    ],
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    button: "Upgrade Now",
    featured: true,
    features: [
      "Unlimited Lessons",
      "AI Writing Assistant",
      "Featured Stories",
      "Advanced Analytics",
      "Priority Support",
      "PDF Export",
    ],
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/month",
    button: "Choose Pro",
    featured: false,
    features: [
      "Everything in Premium",
      "Team Collaboration",
      "Custom Branding",
      "Early Feature Access",
      "Premium Support",
    ],
  },
];

const premiumFeatures = [
  {
    icon: Brain,
    title: "AI Writing Assistant",
    desc: "Improve your stories with intelligent writing suggestions.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track lesson views, likes and reader engagement.",
  },
  {
    icon: Star,
    title: "Featured Stories",
    desc: "Get your best lessons highlighted on the homepage.",
  },
  {
    icon: FileText,
    title: "PDF Export",
    desc: "Download your lessons as beautifully formatted PDFs.",
  },
];

export default function pricingupgradePage() {
  return (
    <section className="max-w-7xl mx-auto w-full overflow-hidden">
      <div className="bg-[#F8F4EE] py-20 px-6 sm:px-8 md:px-10 lg:px-10">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
            <Crown size={18} />
            Upgrade Your Experience
          </div>

          <h1 className="text-5xl font-bold mt-6 text-[#231815]">
            Choose the Perfect Plan
          </h1>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Unlock premium features to share more stories, grow your audience,
            and gain valuable insights from your life lessons.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 shadow-lg bg-white relative ${
                plan.featured ? "border-2 border-blue-600 scale-105" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h2 className="text-3xl font-bold">{plan.name}</h2>

              <div className="flex items-end gap-1 mt-5">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>

              <ul className="space-y-4 mt-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="text-green-600" size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full mt-10 py-3 rounded-xl font-semibold transition ${
                  plan.featured
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {plan.button}
              </button>
            </motion.div>
          ))}

        </div>

        {/* Premium Features */}
        <div className="mt-28">

          <h2 className="text-4xl font-bold text-center text-[#231815]">
            Premium Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

            {premiumFeatures.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 text-center shadow-lg"
              >
                <item.icon
                  className="mx-auto text-blue-600"
                  size={40}
                />

                <h3 className="text-xl font-bold mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* FAQ */}
        <div className="mt-28 max-w-3xl mx-auto">

          <h2 className="text-4xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 mt-10">

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-bold text-lg">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600 mt-2">
                Yes. You can upgrade or cancel your subscription whenever you
                want.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-bold text-lg">
                Is there a free plan?
              </h3>
              <p className="text-gray-600 mt-2">
                Absolutely! You can use our Free plan forever.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-bold text-lg">
                Will more features be added?
              </h3>
              <p className="text-gray-600 mt-2">
                Yes. We continuously improve the platform with new premium
                features.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}