# Botamin — голосовой ИИ-консультант

Демонстрационный одностраничный сайт для тестового задания **Conversation Designer**. Посетитель нажимает на виджет в правом нижнем углу и ведёт голосовой разговор с русскоязычным женским ИИ-консультантом Botamin через официальный [Vapi Web Widget](https://docs.vapi.ai/chat/web-widget).

## Описание

Botamin — это ИИ-агент первой линии продаж. В разговоре он:

1. Узнаёт отрасль компании посетителя.
2. Озвучивает отраслевой хук про рост выручки на 10–15 млн ₽/мес.
3. Предлагает **ровно два** реальных слота из Google Calendar.
4. Собирает телефон или Telegram и рабочую почту.
5. Создаёт 20-минутную встречу в Google Calendar.
6. После брони задаёт квалификационные вопросы и завершает разговор.

Логика агента описана в [`docs/VAPI_SYSTEM_PROMPT.md`](docs/VAPI_SYSTEM_PROMPT.md).

## Архитектура

```text
Пользователь
    ↓
Next.js-сайт на Netlify
    ↓
Vapi Web Widget
    ↓
Vapi Assistant
    ├── распознавание речи
    ├── LLM
    ├── женский русский голос
    ├── Google Calendar Check Availability
    └── Google Calendar Create Event
```

Сайт — статическая/SSR-оболочка на Next.js. Голосовой диалог, LLM, инструменты календаря и синтез речи выполняются на стороне **Vapi**. Отдельный backend, база данных и Cal.com **не используются**.

## Стек

- [Next.js](https://nextjs.org/) 16 (App Router)
- TypeScript
- Tailwind CSS 4
- ESLint
- [Vapi Web Widget](https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js) (UMD, custom element `<vapi-widget>`)
- Деплой: [Netlify](https://www.netlify.com/) + `@netlify/plugin-nextjs`

## Требования

- Node.js 20+
- npm 10+
- Аккаунт [Vapi](https://vapi.ai)
- Google-аккаунт с календарём для демо-встреч

## Локальный запуск

```bash
git clone <your-repo-url>
cd Botamin
npm install
cp .env.example .env.local
# заполните .env.local (см. ниже)
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Настройка `.env.local`

Скопируйте `.env.example` в `.env.local` и укажите:

```env
NEXT_PUBLIC_VAPI_PUBLIC_KEY=pk_...
NEXT_PUBLIC_VAPI_ASSISTANT_ID=asst_...
```

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Public API Key из Vapi Dashboard |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | ID ассистента `Botamin Voice Consultant` |

Без этих переменных сайт **работает**, но показывает заглушку «Vapi ещё не настроен» вместо виджета.

**Не добавляйте** в проект приватные ключи (`VAPI_PRIVATE_KEY`, `GOOGLE_CLIENT_SECRET` и т.п.).

## Настройка Vapi

Подробная инструкция: [`docs/VAPI_SETUP.md`](docs/VAPI_SETUP.md).

Кратко:

1. Создайте ассистента `Botamin Voice Consultant`.
2. Вставьте системный промпт из [`docs/VAPI_SYSTEM_PROMPT.md`](docs/VAPI_SYSTEM_PROMPT.md).
3. Настройте первое сообщение и русский женский голос.
4. Подключите Google Calendar tools: `check_calendar_availability`, `create_calendar_event`.
5. Скопируйте Public Key и Assistant ID в `.env.local`.

## Настройка Google Calendar

1. Создайте календарь `Botamin Demo Meetings` (часовой пояс `Europe/Moscow`).
2. Подключите Google Calendar в Vapi (Integrations → Tools Provider).
3. Создайте и привяжите оба инструмента к ассистенту.
4. Укажите `calendarId` и всегда передавайте `timeZone: Europe/Moscow`.

Подробности — в [`docs/VAPI_SETUP.md`](docs/VAPI_SETUP.md).

## Линтер

```bash
npm run lint
```

## Production build

```bash
npm run build
npm start
```

## Деплой на Netlify

1. Создайте репозиторий на GitHub и отправьте код:

   ```bash
   git remote add origin git@github.com:<user>/botamin.git
   git push -u origin main
   ```

2. В [Netlify](https://app.netlify.com) выберите **Add new site → Import an existing project**.
3. Подключите GitHub-репозиторий.
4. Netlify определит Next.js автоматически (используется `netlify.toml` с `@netlify/plugin-nextjs`).
5. В **Site configuration → Environment variables** добавьте:

   - `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
   - `NEXT_PUBLIC_VAPI_ASSISTANT_ID`

6. Запустите **Deploy**.
7. После деплоя проверьте:
   - сайт открывается по HTTPS;
   - браузер запрашивает доступ к микрофону;
   - виджет запускает разговор;
   - вёрстка на мобильном устройстве.

## Структура проекта

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
    not-found.tsx
  components/
    VapiVoiceWidget.tsx
    HeroSection.tsx
    HowItWorks.tsx
    AgentFeatures.tsx
  types/
    vapi-widget.d.ts
docs/
  VAPI_SETUP.md
  VAPI_SYSTEM_PROMPT.md
  VAPI_TEST_SCENARIOS.md
.env.example
README.md
netlify.toml
```

## Документация

| Файл | Содержание |
|------|------------|
| [`docs/VAPI_SETUP.md`](docs/VAPI_SETUP.md) | Пошаговая настройка Vapi и Google Calendar |
| [`docs/VAPI_SYSTEM_PROMPT.md`](docs/VAPI_SYSTEM_PROMPT.md) | Системный промпт для копирования в Dashboard |
| [`docs/VAPI_TEST_SCENARIOS.md`](docs/VAPI_TEST_SCENARIOS.md) | 20 тестовых сценариев с критериями |

## Известные ограничения

- Виджет требует HTTPS (или `localhost`) и разрешения микрофона.
- Слоты зависят от реального состояния Google Calendar — пустой календарь даёт больше вариантов.
- Публичный Vapi key виден в клиенте — это ожидаемо для Web Widget; приватные ключи не используются.
- Состояние разговора не сохраняется на сайте (нет БД).
- Качество русской речи зависит от выбранного голоса в Vapi Dashboard.

## Чек-лист перед сдачей тестового

- [ ] `.env.local` заполнен Public Key и Assistant ID
- [ ] Ассистент опубликован в Vapi
- [ ] Google Calendar tools подключены и протестированы
- [ ] Пройден сценарий №1 из [`VAPI_TEST_SCENARIOS.md`](docs/VAPI_TEST_SCENARIOS.md)
- [ ] `npm run lint` без ошибок
- [ ] `npm run build` успешен
- [ ] Сайт задеплоен на Netlify с env variables
- [ ] Голосовой разговор работает на мобильном через HTTPS
- [ ] В репозитории нет секретов и `.env.local`

## Лицензия

Демонстрационный проект для тестового задания. Используйте по усмотрению проверяющего.
