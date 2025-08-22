import PrivateRoute from "@/app/privateroute";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function MessagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <PrivateRoute>
          <SpeedInsights />
          {children}
        </PrivateRoute>
  );
}
