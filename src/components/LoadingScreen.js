import { useState, useEffect, useRef } from "react";
import { Bot, Brain, Sparkles, Zap, Stars, Target } from "lucide-react";
import useWorkflowStore from "../store/workflowStore";

export default function LoadingScreen() {
  const { currentPrompt } = useWorkflowStore();
  const [vantaEffect, setVantaEffect] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const vantaRef = useRef(null);

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

  // Cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadingSteps = [
    {
      icon: Brain,
      text: "Analyzing your request",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: Target,
      text: "Identifying optimal tools",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: Sparkles,
      text: "Generating workflow steps",
      color: "from-rose-500 to-orange-500",
      bgColor: "from-rose-50 to-orange-50",
    },
  ];

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #eeeeee 100%)",
      }}
    >
      {/* Enhanced Visible Background */}
      <div className="absolute inset-0 opacity-40">
        {/* More Visible Grid Patterns */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 opacity-60">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(156, 163, 175, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(156, 163, 175, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: "25px 25px",
              animation: "gridSlide 8s ease-in-out infinite",
            }}
          />
        </div>

        <div className="absolute bottom-0 right-0 w-2/5 h-2/5 opacity-50">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(251, 182, 206, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(251, 182, 206, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              animation: "gridSlideReverse 10s ease-in-out infinite",
            }}
          />
        </div>

        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/4 opacity-45">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: "18px 18px",
              animation: "gridPulse 6s ease-in-out infinite",
            }}
          />
        </div>

        {/* Animated shimmer lines - more visible */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-shimmer opacity-60"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-shimmerReverse opacity-50"></div>

        {/* Moving diagonal lines */}
        <div className="absolute top-20 right-20 w-40 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rotate-45 animate-slideIn opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-32 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent -rotate-45 animate-slideOut opacity-40"></div>

        {/* Floating dots for visual interest */}
        <div className="absolute top-16 left-16 w-3 h-3 bg-gray-300 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute bottom-16 right-16 w-2 h-2 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/2 left-10 w-2.5 h-2.5 bg-gray-400 rounded-full animate-ping opacity-40"></div>
      </div>

      {/* Clean Content Container */}
      <div className="max-w-md mx-auto text-center relative z-10 px-4">
        {/* Simplified Header */}
        <div className="mb-8 sm:mb-12 relative">
          {/* Clean Rob Image */}
          <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-pink-50 rounded-full shadow-lg"></div>
            <div className="absolute inset-1 bg-white rounded-full shadow-inner"></div>
            <div className="absolute inset-2 rounded-full overflow-hidden">
              <img
                src="/rob.png"
                alt="Rob AI"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Clean Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            <span className="bg-gradient-to-r from-slate-700 via-white to-rose-600 bg-clip-text text-transparent">
              AI is thinking
            </span>
            <span className="inline-block animate-pulse text-rose-500 ml-1">
              ...
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium">
            Creating your personalized workflow for:
          </p>
        </div>

        {/* Elegant User Request Card */}
        <div className="mb-8 sm:mb-12">
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-transparent to-silver-50/30"></div>
            <div className="relative z-10">
              <p className="text-sm sm:text-base md:text-lg text-slate-800 font-semibold italic">
                &quot;<span className="text-rose-500">{currentPrompt}</span>
                &quot;
              </p>
            </div>
          </div>
        </div>

        {/* Simplified Cloud Steps */}
        <div className="mb-8 sm:mb-12 relative">
          {/* Mobile: Clean Column layout */}
          <div className="block sm:hidden space-y-6">
            {[
              { ...loadingSteps[0], size: "small" },
              { ...loadingSteps[1], size: "medium" },
              { ...loadingSteps[2], size: "small" },
            ].map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  currentStepIndex >= index
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-60"
                }`}
              >
                <CloudBubble
                  icon={step.icon}
                  text={step.text}
                  size={step.size}
                  isActive={currentStepIndex === index}
                  isCompleted={currentStepIndex > index}
                />
              </div>
            ))}
          </div>

          {/* Desktop: Clean Row layout */}
          <div className="hidden sm:flex justify-center items-end gap-8 relative min-h-[140px]">
            {loadingSteps.map((step, index) => {
              const sizes = ["small", "big", "medium"];
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    currentStepIndex >= index
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-50"
                  }`}
                >
                  <CloudBubble
                    icon={step.icon}
                    text={step.text}
                    size={sizes[index]}
                    isActive={currentStepIndex === index}
                    isCompleted={currentStepIndex > index}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Sleek Silver & Pink Progress Bar */}
        <div className="relative mb-6 sm:mb-8">
          <div className="w-full bg-gray-100 rounded-full h-3 shadow-inner overflow-hidden">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-silver-400 via-pink-300 to-silver-400 rounded-full shadow-lg animate-progressFlow"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-shimmer"></div>
              {/* Additional shine effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full animate-shimmerFast"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-3 font-medium">
            <span>Initializing</span>
            <span className="hidden sm:inline">Processing</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Clean Status Message */}
        <div className="text-center space-y-3">
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            This usually takes 2-3 seconds...
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gradient-to-r from-silver-500 to-pink-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gradient-to-r from-pink-400 to-silver-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gradient-to-r from-silver-500 to-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-xs text-slate-500 font-medium ml-2">
              <span className="hidden sm:inline">
                AI Teammate is crafting your workflow
              </span>
              <span className="sm:hidden">Working...</span>
            </span>
          </div>
        </div>
      </div>

      {/* Custom Styles with Visible Animations */}
      <style jsx>{`
        @keyframes gridSlide {
          0%,
          100% {
            transform: translateX(0) translateY(0);
            opacity: 0.6;
          }
          25% {
            transform: translateX(3px) translateY(-2px);
            opacity: 0.8;
          }
          50% {
            transform: translateX(-2px) translateY(3px);
            opacity: 0.4;
          }
          75% {
            transform: translateX(2px) translateY(2px);
            opacity: 0.7;
          }
        }

        @keyframes gridSlideReverse {
          0%,
          100% {
            transform: translateX(0) translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateX(-3px) translateY(2px);
            opacity: 0.7;
          }
          60% {
            transform: translateX(2px) translateY(-3px);
            opacity: 0.3;
          }
          90% {
            transform: translateX(-2px) translateY(-2px);
            opacity: 0.6;
          }
        }

        @keyframes gridPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.45;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.7;
          }
        }

        @keyframes slideIn {
          0%,
          100% {
            transform: translateX(-20px) rotate(45deg);
            opacity: 0.2;
          }
          50% {
            transform: translateX(20px) rotate(45deg);
            opacity: 0.8;
          }
        }

        @keyframes slideOut {
          0%,
          100% {
            transform: translateX(20px) rotate(-45deg);
            opacity: 0.2;
          }
          50% {
            transform: translateX(-20px) rotate(-45deg);
            opacity: 0.6;
          }
        }

        @keyframes progressFlow {
          0% {
            width: 15%;
          }
          25% {
            width: 40%;
          }
          50% {
            width: 65%;
          }
          75% {
            width: 85%;
          }
          100% {
            width: 95%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(300%);
            opacity: 0.3;
          }
        }

        @keyframes shimmerReverse {
          0% {
            transform: translateX(100%);
            opacity: 0.2;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(-300%);
            opacity: 0.2;
          }
        }

        @keyframes shimmerFast {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-progressFlow {
          animation: progressFlow 4s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-shimmerReverse {
          animation: shimmerReverse 3.5s ease-in-out infinite;
        }
        .animate-shimmerFast {
          animation: shimmerFast 1.5s ease-in-out infinite;
        }
        .animate-slideIn {
          animation: slideIn 4s ease-in-out infinite;
        }
        .animate-slideOut {
          animation: slideOut 5s ease-in-out infinite;
        }

        /* Custom silver and pink colors */
        .from-silver-400 {
          --tw-gradient-from: #94a3b8;
        }
        .via-silver-400 {
          --tw-gradient-via: #94a3b8;
        }
        .to-silver-400 {
          --tw-gradient-to: #94a3b8;
        }
        .from-silver-500 {
          --tw-gradient-from: #64748b;
        }
        .to-silver-500 {
          --tw-gradient-to: #64748b;
        }
        .from-silver-300 {
          --tw-gradient-from: #cbd5e1;
        }
        .via-silver-300 {
          --tw-gradient-via: #cbd5e1;
        }
        .to-silver-300 {
          --tw-gradient-to: #cbd5e1;
        }
        .bg-silver-50 {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
}

function CloudBubble({ icon: Icon, text, size, isActive, isCompleted }) {
  // Size configurations for realistic clouds - responsive
  const sizeConfig = {
    small: {
      container: "w-20 h-12 sm:w-24 sm:h-16",
      icon: "w-3 h-3 sm:w-4 sm:h-4",
      text: "text-xs",
    },
    medium: {
      container: "w-24 h-16 sm:w-32 sm:h-20",
      icon: "w-4 h-4 sm:w-5 sm:h-5",
      text: "text-xs sm:text-sm",
    },
    big: {
      container: "w-28 h-18 sm:w-40 sm:h-24",
      icon: "w-5 h-5 sm:w-6 sm:h-6",
      text: "text-sm sm:text-base",
    },
  };

  const config = sizeConfig[size];

  return (
    <div className="relative flex flex-col items-center">
      {/* Sleek Cloud Shape */}
      <div
        className={`${config.container} relative transition-all duration-500 ${
          isActive ? "animate-pulse" : ""
        }`}
      >
        {/* Main cloud body with silver & pink styling */}
        <div className="absolute inset-0">
          {/* Base cloud shape */}
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-3/4 transition-all duration-500 ${
              isActive
                ? "bg-gradient-to-br from-pink-100 to-gray-100 shadow-lg"
                : isCompleted
                ? "bg-gradient-to-br from-green-100 to-gray-50 shadow-md"
                : "bg-gradient-to-br from-gray-50 to-white shadow-md"
            }`}
            style={{
              borderRadius: "50px 50px 50px 50px",
            }}
          ></div>

          {/* Fluffy cloud bumps with silver tones */}
          <div
            className={`absolute top-0 left-1/4 w-1/3 h-2/3 transition-all duration-500 ${
              isActive
                ? "bg-gradient-to-br from-pink-50 to-gray-50"
                : isCompleted
                ? "bg-gradient-to-br from-green-50 to-gray-25"
                : "bg-gradient-to-br from-gray-25 to-white"
            }`}
            style={{ borderRadius: "50%" }}
          ></div>

          <div
            className={`absolute top-1/4 right-1/4 w-1/4 h-1/2 transition-all duration-500 ${
              isActive
                ? "bg-gradient-to-br from-pink-25 to-gray-25"
                : isCompleted
                ? "bg-gradient-to-br from-green-25 to-gray-25"
                : "bg-gradient-to-br from-gray-25 to-gray-50"
            }`}
            style={{ borderRadius: "50%" }}
          ></div>

          <div
            className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 w-2/5 h-3/5 transition-all duration-500 ${
              isActive
                ? "bg-gradient-to-br from-pink-50 to-gray-25"
                : isCompleted
                ? "bg-gradient-to-br from-green-50 to-gray-25"
                : "bg-gradient-to-br from-gray-25 to-gray-50"
            }`}
            style={{ borderRadius: "50%" }}
          ></div>
        </div>

        {/* Icon in center of cloud - sleek styling */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${
              isActive
                ? "bg-gradient-to-br from-pink-400 to-gray-500 text-white shadow-lg"
                : isCompleted
                ? "bg-gradient-to-br from-green-400 to-gray-400 text-white shadow-md"
                : "bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-md"
            } p-1.5 sm:p-2 rounded-full transition-all duration-300`}
          >
            <Icon className={config.icon} />
          </div>
        </div>
      </div>

      {/* Text with black color for readability */}
      <div className="mt-1 sm:mt-2 relative">
        <span
          className={`${config.text} font-bold text-black transition-colors duration-300 text-center block leading-tight px-1`}
        >
          {text}
        </span>

        {/* Status dots with silver & pink theme */}
        <div className="flex justify-center mt-1 sm:mt-2">
          {isCompleted ? (
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-green-400 to-gray-400 rounded-full shadow-sm"></div>
          ) : isActive ? (
            <div className="flex gap-1">
              <div
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-pink-400 to-gray-400 rounded-full animate-bounce shadow-sm"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-gray-400 to-pink-400 rounded-full animate-bounce shadow-sm"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-pink-400 to-gray-400 rounded-full animate-bounce shadow-sm"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          ) : (
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 border border-gray-400 rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
}
