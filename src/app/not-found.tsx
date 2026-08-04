import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-indigo-600">
        BOTAMIN
      </p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Страница не найдена</h1>
      <p className="mt-3 max-w-md text-slate-600">
        Запрошенная страница не существует или была перемещена.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        На главную
      </Link>
    </main>
  );
}
