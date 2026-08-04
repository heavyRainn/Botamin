const FEATURES = [
  {
    title: "Понимает русский язык",
    description: "Ведёт естественный разговор на русском без канцелярита.",
  },
  {
    title: "Соблюдает рабочие часы",
    description: "Предлагает встречи только в будни с 09:00 до 17:00 по Москве.",
  },
  {
    title: "Проверяет календарь",
    description: "Не выдумывает слоты — каждый вариант проверяется через Google Calendar.",
  },
  {
    title: "Устойчив к посторонним вопросам",
    description: "Кратко отвечает и возвращает разговор к записи на встречу.",
  },
  {
    title: "Не выдумывает данные",
    description: "Не называет цены, сроки и клиентов без подтверждённой информации.",
  },
  {
    title: "Собирает квалификацию после брони",
    description: "После успешной записи уточняет заявки и число менеджеров.",
  },
] as const;

export function AgentFeatures() {
  return (
    <section
      className="border-t border-slate-100 bg-gradient-to-b from-white to-slate-50 px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="features-heading"
          className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Что умеет агент
        </h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-100/40"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
