import { SiteLayout } from "../../components/layout/SiteLayout";

export default function SearchPage() {
  return (
    <SiteLayout>
      <section className="max-w-[1500px] mx-auto px-4 sm:px-8 py-10">
        <h1 className="font-serif text-2xl tracking-tight">Search</h1>
        <p className="mt-2 text-flat-muted">Search screen (mobile bottom nav).</p>
      </section>
    </SiteLayout>
  );
}

