import { useState, useEffect, useRef } from "react";
import { Bot, Brain, Sparkles } from "lucide-react";
import useWorkflowStore from "../store/workflowStore";

export default function LoadingScreen() {
  const { currentPrompt } = useWorkflowStore();
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      import("vanta/dist/vanta.fog.min.js").then((VANTA) => {
        import("three").then((THREE) => {
          setVantaEffect(
            VANTA.default.FOG({
              el: vantaRef.current,
              THREE: THREE,
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
            })
          );
        });
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const loadingSteps = [
    { icon: Brain, text: "Analyzing your request", delay: 0 },
    { icon: Bot, text: "Identifying optimal tools", delay: 500 },
    { icon: Sparkles, text: "Generating workflow steps", delay: 1000 },
  ];

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center p-6 relative"
    >
      <div className="max-w-md mx-auto text-center relative z-10">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full animate-pulse shadow-lg">
              <Bot className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 p-1 rounded-full animate-bounce shadow-lg">
              <Sparkles className="h-4 w-4 text-yellow-800" />
            </div>
          </div>
        </div>

        {/* Main Loading Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-sm">
          AI is thinking...
        </h2>
        <p className="text-gray-700 mb-8 drop-shadow-sm">
          Creating your personalized workflow for:
        </p>

        {/* User Request */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-8 border-2 border-gray-200 shadow-lg">
          <p className="text-gray-800 italic">&quot;{currentPrompt}&quot;</p>
        </div>

        {/* Loading Steps */}
        <div className="space-y-4 mb-8">
          {loadingSteps.map((step, index) => (
            <LoadingStep
              key={index}
              icon={step.icon}
              text={step.text}
              delay={step.delay}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200/80 backdrop-blur-sm rounded-full h-2 shadow-sm">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse shadow-sm"
            style={{
              width: "60%",
              animation: "loadingProgress 3s ease-in-out infinite",
            }}
          ></div>
        </div>

        <p className="text-sm text-gray-600 mt-4 drop-shadow-sm">
          This usually takes 2-3 seconds...
        </p>
      </div>

      <style jsx>{`
        @keyframes loadingProgress {
          0% {
            width: 20%;
          }
          50% {
            width: 80%;
          }
          100% {
            width: 20%;
          }
        }
      `}</style>
    </div>
  );
}

function LoadingStep({ icon: Icon, text, delay }) {
  return (
    <div
      className="flex items-center gap-3 text-left opacity-0 animate-fadeIn bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
        <Icon className="h-4 w-4 text-blue-600" />
      </div>
      <span className="text-gray-700">{text}</span>
      <div className="flex gap-1 ml-auto">
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
