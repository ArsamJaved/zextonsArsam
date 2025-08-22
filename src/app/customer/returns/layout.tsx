import PrivateRoute from "@/app/privateroute";

export default function ReturnOrdersLayout({
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
