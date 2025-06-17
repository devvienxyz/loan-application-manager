import { useLogout } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore((s) => s);
  const { mutate: logout } = useLogout();

  return (
    <div className="bg-primary min-h-screen">
      {isAuthenticated && (
        <>
          <nav className="flex justify-end w-full py-4 px-6">
            <button className="" type="button" onClick={() => logout()}>Logout</button>
          </nav>

          <div className="w-full flex justify-center">
            <div className="w-full lg:w-2/3 xl:w-1/2">
              {children}
            </div>
          </div>
        </>
      )}

      {!isAuthenticated && (
        <div className="">
          {children}
        </div>
      )}
    </div >
  );
}
