const STEPS = [
  {
    number: "1",
    title: "Расскажите о компании",
    description: "Консультант узнает, чем занимается ваш бизнес.",
  },
  {
    number: "2",
    title: "Выберите один из двух слотов",
    description: "Агент проверит календарь и предложит два реальных времени.",
  },
  {
    number: "3",
    title: "Оставьте контакты",
    description: "Телефон или Telegram и рабочая почта для приглашения.",
  },
  {
    number: "4",
    title: "Получите приглашение на встречу",
    description: "Событие создаётся в Google Calendar после подтверждения данных.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      className="border-t border-slate-100 bg-white px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="how-it-works-heading"
          className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Как проходит разговор
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition-shadow duration-300 hover:shadow-md hover:shadow-indigo-100/50"
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
