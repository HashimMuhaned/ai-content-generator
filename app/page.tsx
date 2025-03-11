"use client";

import { Brain, Sparkles, Bot, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white font-Inter overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

        <div
          className={`max-w-4xl mx-auto text-center transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles size={20} />
            <span className="text-sm font-medium">
              AI-Powered Content Generation
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create Amazing Content with
            <span className="text-primary"> Artificial Intelligence</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your ideas into engaging content in seconds with our
            advanced AI technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="px-8 py-4 bg-primary text-white rounded-lg transform transition-all hover:scale-105 hover:shadow-lg font-medium"
              onClick={() => router.push("/dashboard")}
            >
              Get Started Free
            </button>
            <button className="px-8 py-4 border-2 border-primary/20 text-primary rounded-lg transform transition-all hover:scale-105 hover:bg-primary/5 font-medium">
              <a href="#more">Descover More</a>
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-float delay-100">
            <div className="bg-white/30 backdrop-blur-lg p-4 rounded-xl shadow-lg">
              <Brain className="text-primary" size={24} />
            </div>
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float delay-300">
            <div className="bg-white/30 backdrop-blur-lg p-4 rounded-xl shadow-lg">
              <Bot className="text-primary" size={24} />
            </div>
          </div>
          <div className="absolute bottom-1/4 right-1/3 animate-float delay-500">
            <div className="bg-white/30 backdrop-blur-lg p-4 rounded-xl shadow-lg">
              <Zap className="text-primary" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-primary/5" id="more">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Create Content Like Never Before
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you generate high-quality content in
              minutes, not hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? "animate-fade-up" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of creators who trust our AI to generate amazing
            content.
          </p>
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-primary text-white rounded-lg transform transition-all hover:scale-105 hover:shadow-lg font-medium">
              Start Creating Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: <Brain size={32} />,
    title: "AI-Powered Writing",
    description:
      "Generate human-like content with advanced artificial intelligence technology.",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Smart Templates",
    description:
      "Choose from hundreds of pre-built templates for any content type.",
  },
  {
    icon: <Zap size={32} />,
    title: "Lightning Fast",
    description:
      "Create engaging content in seconds with our powerful AI engine.",
  },
];

export default HomePage;
