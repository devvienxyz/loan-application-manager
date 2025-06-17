import { useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore((s) => s);
  const { mutate: logout } = useLogout();

  return (
    <div className="bg-primary min-h-screen">
      {isAuthenticated && (
        <nav className="flex justify-between w-full py-4 px-6">
          <div>Hello, {user?.fullName || "Guest"} 👋</div>
          <button className="" type="button" onClick={() => logout()}>Logout</button>
        </nav>
      )}

      <div className="">
        {children}
      </div>
    </div>
  );
}
