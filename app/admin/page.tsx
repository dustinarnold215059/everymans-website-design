import { redirect } from "next/navigation";
import { isAdmin, adminConfigured } from "@/lib/admin-auth";
import { Container } from "@/components/ui/Container";
import { LeadTable, type AdminLead } from "@/components/admin/LeadTable";

export const dynamic = "force-dynamic";

async function loadLeads(): Promise<{ leads: AdminLead[]; error?: string }> {
  if (!process.env.DATABASE_URL) return { leads: [], error: "DATABASE_URL is not set." };
  try {
    const { prisma } = await import("@/lib/prisma");
    const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
    return {
      leads: rows.map((r) => ({
        id: r.id,
        createdAt: r.createdAt.toISOString(),
        name: r.name,
        organization: r.organization,
        email: r.email,
        need: r.need,
        message: r.message,
        sourcePath: r.sourcePath,
        audience: r.audience,
        citySlug: r.citySlug,
        status: r.status,
        notes: r.notes,
        quotedCents: r.quotedCents,
      })),
    };
  } catch (err) {
    return { leads: [], error: err instanceof Error ? err.message : "Could not read leads." };
  }
}

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-xl rounded-[20px] border border-line bg-surface p-8">
          <h1 className="font-display text-[26px] font-medium">Admin is not configured</h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-muted">
            Set <code>ADMIN_ACCESS_CODE</code> and <code>ADMIN_JWT_SECRET</code> (32+ characters)
            in the environment, then redeploy.
          </p>
        </div>
      </Container>
    );
  }

  if (!(await isAdmin())) redirect("/admin/login");

  const { leads, error } = await loadLeads();

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <Container className="py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[32px] font-medium tracking-[-0.018em]">Inquiries</h1>
          <p className="mt-1.5 text-[14.5px] text-muted">
            {leads.length} total
            {Object.entries(counts).length > 0 && (
              <>
                {" · "}
                {Object.entries(counts)
                  .map(([k, v]) => `${v} ${k.toLowerCase()}`)
                  .join(" · ")}
              </>
            )}
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="rounded-full border border-line px-4 py-2 text-[13.5px] font-semibold text-muted transition-colors hover:border-accent hover:text-accent-ink"
          >
            Sign out
          </button>
        </form>
      </div>

      {error && (
        <p className="mt-6 rounded-lg border border-accent/40 bg-accent/5 px-4 py-3 text-sm text-ink" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8">
        <LeadTable leads={leads} />
      </div>
    </Container>
  );
}
