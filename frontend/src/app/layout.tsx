import { useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { mutate: logout } = useLogout();

	return <div className="bg-primary-bg min-h-screen">
    <nav className="">
      {isAuthenticated && (
        <>
        <div>Hello, Vivien</div>
        <button className="" type="button" onClick={() => logout()}>Logout</button>
        </>
      )}
    </nav>

    <div className="">
      {children}
    </div>
    </div>;
}
