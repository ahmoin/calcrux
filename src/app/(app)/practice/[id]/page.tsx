import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PracticeSession } from "@/components/practice/practice-session";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

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
						<PracticeSession practiceId={id} />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
