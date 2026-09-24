export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">Bejelentkezés</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="pelda@valami.hu"
              className="rounded-md border border-gray-300 px-3 py-2 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Jelszó</label>
            <input id="password" type="password" name="password" />
          </div>
          <button type="submit">Bejelentkezés</button>
        </form>
      </section>
    </main>
  );
}
