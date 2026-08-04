"use client";

import { useState } from "react";
import { AgentFeatures } from "@/components/AgentFeatures";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { VapiVoiceWidget } from "@/components/VapiVoiceWidget";
import type { WidgetState } from "@/types/widget-state";

export default function Home() {
  const [widgetState, setWidgetState] = useState<WidgetState>("loading");

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-lg font-bold tracking-[0.2em] text-slate-900">
            BOTAMIN
          </p>
          <p className="text-sm text-slate-500 sm:text-sm">
            Голосовой ИИ-консультант
          </p>
        </div>
      </header>

      <main>
        <HeroSection widgetState={widgetState} />
        <HowItWorks />
        <AgentFeatures />
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-5xl text-center text-sm text-slate-500">
          Демонстрационный проект для тестового задания Conversation Designer.
        </p>
      </footer>

      <VapiVoiceWidget onStateChange={setWidgetState} />
    </>
  );
}
