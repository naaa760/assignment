import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
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
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Moving Background Image Layer */}
      <div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{
          backgroundImage: "url(/k.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          animation: "float 6s ease-in-out infinite",
        }}
      />

      {/* Additional Moving Layer for Depth */}
      <div
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          backgroundImage: "url(/k.png)",
          backgroundSize: "120% 120%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          animation: "floatReverse 8s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div className="w-full max-w-3xl mx-auto text-center relative z-10">
        {/* Main Heading with Animation */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold leading-tight text-center max-w-[800px] lg:max-w-3xl md:max-w-2xl sm:max-w-xl bg-gradient-to-r from-gray-300 via-black to-rose-600 bg-clip-text text-transparent mx-auto">
            Create intelligent{" "}
            <span className="relative inline-block">
              <span
                key={currentWordIndex}
                className="block w-full flex-grow overflow-hidden absolute left-0 animate-fadeInUp"
                style={{
                  background:
                    "linear-gradient(135deg, #E5E7EB 0%, #000000 25%, #DC2626 50%, #F3F4F6 75%, #BE185D 100%)",
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
            <div className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
              <div className="flex items-center p-6">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hey AI Teammate..."
                  className="flex-1 text-lg bg-transparent border-none outline-none placeholder-gray-500 text-gray-900 pr-4"
                  disabled={isLoading}
                />

                {/* Beautiful Send Button */}
                {input.trim() && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-shrink-0 ml-3 p-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </button>
                )}
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-10px) translateX(5px) scale(1.02);
          }
          50% {
            transform: translateY(-5px) translateX(-3px) scale(1.01);
          }
          75% {
            transform: translateY(-15px) translateX(2px) scale(1.03);
          }
        }

        @keyframes floatReverse {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1.1);
          }
          25% {
            transform: translateY(8px) translateX(-4px) scale(1.08);
          }
          50% {
            transform: translateY(12px) translateX(6px) scale(1.12);
          }
          75% {
            transform: translateY(4px) translateX(-2px) scale(1.09);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
