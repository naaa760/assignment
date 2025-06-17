import { useState, useEffect, useRef } from "react";
import { Send, Sparkles } from "lucide-react";
import useWorkflowStore from "../store/workflowStore";

export default function InputSection() {
  const [input, setInput] = useState("");
  const [vantaEffect, setVantaEffect] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const vantaRef = useRef(null);

  const { generateWorkflow, isLoading, setCurrentPrompt, currentPrompt } =
    useWorkflowStore();

  // Animated words for the changing text effect
  const animatedWords = [
    "workflows",
    "automation",
    "tasks",
    "processes",
    "integrations",
    "solutions",
  ];

  useEffect(() => {
    // Animate word changes
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && typeof window !== "undefined") {
      // Wait for scripts to load then initialize Vanta
      const initVanta = () => {
        if (window.VANTA && window.THREE) {
          const effect = window.VANTA.FOG({
            el: vantaRef.current,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0xd7b8b8,
            midtoneColor: 0xffffff,
            lowlightColor: 0xffe4e4,
            baseColor: 0xffffff,
            blurFactor: 0.9,
            speed: 1.1,
            zoom: 0.9,
          });
          setVantaEffect(effect);
        } else {
          setTimeout(initVanta, 100);
        }
      };

      initVanta();
    }

    return () => {
      if (vantaEffect && typeof vantaEffect.destroy === "function") {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, [vantaEffect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      setCurrentPrompt(input);
      await generateWorkflow(input);
    }
  };

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Content */}
      <div className="w-full max-w-3xl mx-auto text-center relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <span className="ml-3 text-2xl font-bold text-gray-900">
            AI Teammate
          </span>
        </div>

        {/* Main Heading with Animation */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            Create intelligent{" "}
            <span className="relative inline-block">
              <span
                key={currentWordIndex}
                className="block w-full flex-grow overflow-hidden absolute left-0 animate-fadeInUp"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {animatedWords[currentWordIndex]}
              </span>
              <span className="invisible">{animatedWords[0]}</span>
            </span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
              <div className="flex items-center p-6">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hey AI Teammate..."
                  className="flex-1 text-lg bg-transparent border-none outline-none placeholder-gray-500 text-gray-900"
                  disabled={isLoading}
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 ml-4 p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            "Clean up my CRM",
            "Organize emails",
            "Sync data",
            "Create workflow",
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => setInput(action)}
              disabled={isLoading}
              className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full text-sm text-gray-700 hover:bg-white/80 hover:shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Describe your task in plain English and get back an AI-generated,
          editable workflow
        </p>

        {/* Current Request Display */}
        {currentPrompt && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
              <p className="text-sm text-blue-600 font-medium mb-1">
                Processing request:
              </p>
              <p className="text-blue-800">&quot;{currentPrompt}&quot;</p>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
