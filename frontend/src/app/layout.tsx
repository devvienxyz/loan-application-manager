import { useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {isAuthenticated, user} = useAuthStore((s) => s);
  const { mutate: logout } = useLogout();

  console.log(isAuthenticated, user)

	return <div className="bg-primary-bg min-h-screen">
    <nav className="">
      {isAuthenticated && (
        <>
        <div>Hello, {user?.fullName || "Guest"}</div>
        <button className="" type="button" onClick={() => logout()}>Logout</button>
        </>
      )}
    </nav>

    <div className="">
      {children}
    </div>
    </div>;
}
