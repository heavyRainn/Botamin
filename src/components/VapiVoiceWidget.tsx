"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import type { WidgetState } from "@/types/widget-state";

const VAPI_SCRIPT_URL =
  "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";

interface VapiVoiceWidgetProps {
  onStateChange: (state: WidgetState) => void;
}

interface VapiEnvConfig {
  publicKey: string;
  assistantId: string;
}

interface WidgetLoaderOptions {
  container: HTMLElement;
  component: string;
  props: Record<string, string | boolean>;
}

declare global {
  interface Window {
    WidgetLoader?: new (options: WidgetLoaderOptions) => unknown;
  }
}

function getEnvConfig(): VapiEnvConfig | null {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY?.trim();
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID?.trim();

  if (!publicKey || !assistantId) {
    return null;
  }

  return { publicKey, assistantId };
}

function isWidgetInitialized(element: HTMLElement): boolean {
  return (
    element.dataset.vapiInitialized === "true" ||
    element.querySelector(".vapi-widget-wrapper") !== null
  );
}

function buildWidgetProps(config: VapiEnvConfig): Record<string, string | boolean> {
  return {
    publicKey: config.publicKey,
    assistantId: config.assistantId,
    mode: "voice",
    theme: "light",
    size: "compact",
    borderRadius: "large",
    position: "bottom-right",
    mainLabel: "Консультант Botamin",
    startButtonText: "Начать разговор",
    endButtonText: "Завершить",
    emptyVoiceMessage: "Нажмите, чтобы поговорить с консультантом",
  };
}

function mountVapiWidget(
  element: HTMLElement,
  config: VapiEnvConfig,
): boolean {
  if (isWidgetInitialized(element)) {
    return true;
  }

  if (typeof window.WidgetLoader !== "function") {
    return false;
  }

  try {
    new window.WidgetLoader({
      container: element,
      component: "VapiWidget",
      props: buildWidgetProps(config),
    });
    element.dataset.vapiInitialized = "true";
    return true;
  } catch {
    return false;
  }
}

export function VapiVoiceWidget({ onStateChange }: VapiVoiceWidgetProps) {
  const config = getEnvConfig();
  const widgetRef = useRef<HTMLElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [widgetMounted, setWidgetMounted] = useState(false);

  const tryMountWidget = useCallback((): boolean => {
    const element = widgetRef.current;
    if (!element || !config) {
      return false;
    }

    return mountVapiWidget(element, config);
  }, [config]);

  const handleCallStart = useCallback(() => {
    onStateChange("active");
  }, [onStateChange]);

  const handleCallEnd = useCallback(() => {
    onStateChange("ended");
  }, [onStateChange]);

  const handleWidgetError = useCallback(() => {
    onStateChange("error");
  }, [onStateChange]);

  useEffect(() => {
    if (!config) {
      onStateChange("unconfigured");
      return;
    }

    if (scriptError) {
      onStateChange("error");
      return;
    }

    if (!scriptLoaded || !widgetMounted) {
      onStateChange("loading");
      return;
    }

    if (tryMountWidget()) {
      onStateChange("ready");
      return;
    }

    onStateChange("error");
  }, [
    config,
    scriptError,
    scriptLoaded,
    widgetMounted,
    tryMountWidget,
    onStateChange,
  ]);

  useEffect(() => {
    if (!scriptLoaded || !config) {
      return;
    }

    tryMountWidget();
  }, [scriptLoaded, config, tryMountWidget]);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget || !widgetMounted) {
      return;
    }

    widget.addEventListener("call-start", handleCallStart);
    widget.addEventListener("call-end", handleCallEnd);
    widget.addEventListener("error", handleWidgetError);

    return () => {
      widget.removeEventListener("call-start", handleCallStart);
      widget.removeEventListener("call-end", handleCallEnd);
      widget.removeEventListener("error", handleWidgetError);
    };
  }, [widgetMounted, handleCallStart, handleCallEnd, handleWidgetError]);

  const setWidgetRef = useCallback((node: HTMLElement | null) => {
    widgetRef.current = node;
    setWidgetMounted(node !== null);
  }, []);

  if (!config) {
    return (
      <aside
        className="fixed bottom-6 right-6 z-50 w-[min(calc(100vw-2rem),20rem)] rounded-2xl border border-indigo-100 bg-white p-5 shadow-lg shadow-indigo-100/60"
        aria-label="Настройка Vapi"
      >
        <p className="text-sm font-semibold text-slate-900">Vapi ещё не настроен</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Добавьте{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
            NEXT_PUBLIC_VAPI_PUBLIC_KEY
          </code>{" "}
          и{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
            NEXT_PUBLIC_VAPI_ASSISTANT_ID
          </code>{" "}
          в файл <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">.env.local</code>.
        </p>
      </aside>
    );
  }

  return (
    <>
      <Script
        src={VAPI_SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
        onError={() => setScriptError(true)}
      />
      <vapi-widget
        ref={setWidgetRef}
        public-key={config.publicKey}
        assistant-id={config.assistantId}
        mode="voice"
        theme="light"
        size="compact"
        radius="large"
        position="bottom-right"
        main-label="Консультант Botamin"
        start-button-text="Начать разговор"
        end-button-text="Завершить"
        empty-voice-message="Нажмите, чтобы поговорить с консультантом"
      />
    </>
  );
}
