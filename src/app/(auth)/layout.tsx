import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoogleOAuthProvider clientId="371240073052-aq5df8mm5a63e1m8ta5c3hbf2ig548hc.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
    </>
  );
}
