"use client";

import { useQuery } from "convex/react";
import * as React from "react";
import { api } from "@/../convex/_generated/api";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthModal } from "@/components/auth-modal";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function SettingsPage() {
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
				<div className="flex flex-1 flex-col">
					<div className="container mx-auto py-6 space-y-6">
						<div>
							<h1 className="text-3xl font-bold">Settings</h1>
							<p className="text-muted-foreground">
								Manage your profile and customize your preferences.
							</p>
						</div>

						<Separator />

						<Card>
							<CardHeader>
								<CardTitle>Profile</CardTitle>
								<CardDescription>
									Update your personal information.
								</CardDescription>
							</CardHeader>
							<CardContent></CardContent>
						</Card>
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
