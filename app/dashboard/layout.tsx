import type { Metadata } from "next";
import DashboardLayoutClient from "./DashboardLayoutClient";

export const metadata: Metadata = {
    title: "Dashboard | ALMA",
    description: "ALMA Dashboard - Food Spoilage Detection and Management",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DashboardLayoutClient>
            {children}
        </DashboardLayoutClient>
    );
}
