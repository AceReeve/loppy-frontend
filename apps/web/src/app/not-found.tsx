import Link from "next/link";

export default function NotFound() {
  return (
    <section className="absolute inset-0 flex items-center justify-center">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Something&apos;s missing.
          </p>
          <p className="mb-10 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.{" "}
          </p>
          <Link className="btn-outline-primary" href="/dashboard">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
