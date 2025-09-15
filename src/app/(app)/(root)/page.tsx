"use client";

import { useQuery } from "convex/react";
import * as React from "react";
import { api } from "@/../convex/_generated/api";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthModal } from "@/components/auth-modal";
import { PracticeCards } from "@/components/practice-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function IndexPage() {
	const [showAuthModal, setShowAuthModal] = React.useState(false);
	const [authFlow, setAuthFlow] = React.useState<"signIn" | "signUp">("signUp");
	const user = useQuery(api.users.viewer);

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
					name: user?.name ?? "",
					email: user?.email ?? "",
				}}
				setShowAuthModal={setShowAuthModal}
				variant="inset"
			/>
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<PracticeCards />
						</div>
					</div>
				</div>
			</SidebarInset>
			<AuthModal
				authFlow={authFlow}
				setAuthFlow={setAuthFlow}
				showAuthModal={showAuthModal}
				setShowAuthModal={setShowAuthModal}
			/>
		</SidebarProvider>
	);
}
