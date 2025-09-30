import { api } from "@/../convex/_generated/api";
import { AppSidebar } from "@/components/app-sidebar";
import { PracticeCards } from "@/components/practice-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";

export default async function PracticePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

    const viewer = await fetchQuery(
		api.users.viewer,
		{},
		{ token: await convexAuthNextjsToken() },
	);

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar
                user={{
                    name: viewer?.name ?? "",
                    email: viewer?.email ?? "",
                }}
                variant="inset"
            />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            {id}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}