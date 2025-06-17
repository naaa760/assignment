"use client";

import useWorkflowStore from "../store/workflowStore";
import InputSection from "../components/InputSection";
import EditingSection from "../components/EditingSection";
import ConfirmationSection from "../components/ConfirmationSection";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const { currentStep, isLoading } = useWorkflowStore();

  const renderCurrentStep = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    switch (currentStep) {
      case "input":
        return <InputSection />;
      case "editing":
        return <EditingSection />;
      case "confirmation":
        return <ConfirmationSection />;
      default:
        return <InputSection />;
    }
  };

  return <main className="min-h-screen">{renderCurrentStep()}</main>;
}
