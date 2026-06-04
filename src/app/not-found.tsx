import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-bold text-slate-900">404</h1>
      <p className="mt-3 text-slate-600">Page not found.</p>
      <Link
        href="/"
        className="mt-8 inline-block text-brand hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}
