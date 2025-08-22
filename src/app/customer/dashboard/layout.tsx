import PrivateRoute from "@/app/privateroute";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Customer Dashboard | Zextons Tech Store",
  description: "Customer Dashboard | Zextons Tech Store",
};
export default function CustomerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <PrivateRoute>
          {children}
        </PrivateRoute>
  );
}
