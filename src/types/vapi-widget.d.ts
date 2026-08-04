import type { DetailedHTMLProps, HTMLAttributes } from "react";

type VapiWidgetAttributes = {
  "public-key"?: string;
  "assistant-id"?: string;
  mode?: "voice" | "chat";
  theme?: "light" | "dark";
  size?: "compact" | "full";
  radius?: "none" | "small" | "medium" | "large";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  "main-label"?: string;
  "start-button-text"?: string;
  "end-button-text"?: string;
  "empty-voice-message"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vapi-widget": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & VapiWidgetAttributes,
        HTMLElement
      >;
    }
  }
}

export {};
