import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | ALMA",
    description: "Sign in to your ALMA account",
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
