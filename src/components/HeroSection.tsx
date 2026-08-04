import type { WidgetState } from "@/types/widget-state";

interface HeroSectionProps {
  widgetState: WidgetState;
}

const STATUS_CONFIG: Record<
  WidgetState,
  { label: string; tone: "neutral" | "success" | "active" | "muted" | "error" }
> = {
  loading: { label: "Подключаем голосового консультанта…", tone: "neutral" },
  ready: { label: "Консультант готов к разговору", tone: "success" },
  active: { label: "Разговор идёт", tone: "active" },
  ended: { label: "Разговор завершён", tone: "muted" },
  error: { label: "Не удалось запустить голосовой виджет", tone: "error" },
  unconfigured: {
    label: "Голосовой консультант ожидает настройки",
    tone: "neutral",
  },
};

const TONE_STYLES = {
  neutral: "border-slate-200 bg-white text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  active: "border-indigo-200 bg-indigo-50 text-indigo-800",
  muted: "border-slate-200 bg-slate-50 text-slate-600",
  error: "border-red-200 bg-red-50 text-red-800",
};

const BENEFITS = [
  "Короткий разговор",
  "Реальные доступные слоты",
  "Приглашение в Google Calendar",
] as const;

export function HeroSection({ widgetState }: HeroSectionProps) {
  const status = STATUS_CONFIG[widgetState];
  const toneClass = TONE_STYLES[status.tone];

  return (
    <section
      className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 -z-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 -z-10 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl text-center">
        <h1
          id="hero-heading"
          className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-tight"
        >
          ИИ-агент для первой линии продаж
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Расскажите о своей компании голосом. Консультант подберёт релевантный
          сценарий и предложит время 20-минутной встречи с экспертом.
        </p>

        <div
          className={`mx-auto mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${toneClass}`}
          role="status"
          aria-live="polite"
        >
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              widgetState === "active"
                ? "animate-pulse bg-indigo-500"
                : widgetState === "ready"
                  ? "bg-emerald-500"
                  : widgetState === "error"
                    ? "bg-red-500"
                    : "bg-slate-400"
            }`}
            aria-hidden="true"
          />
          {status.label}
        </div>

        {widgetState === "error" && (
          <p className="mx-auto mt-3 max-w-lg text-sm text-red-700">
            Проверьте доступ к микрофону, подключение к интернету и попробуйте
            обновить страницу.
          </p>
        )}

        <p className="mx-auto mt-6 max-w-xl rounded-xl border border-indigo-100 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur-sm">
          Нажмите на виджет в правом нижнем углу и разрешите доступ к
          микрофону.
        </p>

        <ul className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
