import { Redirect } from "wouter";
import LoginForm from "../components/login-form";
import useAuthContext from "@/hooks/useAuthContext";

export default function LogIn() {
  const { currentUser } = useAuthContext();

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <main className="relative min-h-screen">
      <div className="absolute top-6 left-6 z-20">
        <h1 className="font-garamond text-2xl font-semibold text-white">
          Y-Axis
        </h1>
      </div>

      <div className="lg:hidden min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 relative bg-[url('/login.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="z-10 w-full max-w-sm bg-bg-primary shadow-xl p-6 sm:p-8">
          <header className="mb-6">
            <h1 className="font-garamond text-2xl font-bold text-accent text-center">
              Welcome back!
            </h1>
            <h2 className="text-md text-center">Good to see you again.</h2>
          </header>

          <LoginForm />
        </div>
      </div>

      <div className="hidden lg:flex min-h-screen w-full">
        <div className="w-1/2 relative bg-[url('/login.jpg')] bg-cover bg-center"></div>

        <div className="w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-md w-full">
            <header className="mb-8">
              <h1 className="font-garamond text-3xl lg:text-4xl font-bold text-accent-foreground">
                Welcome back!
              </h1>
              <h2 className="text-lg">Good to see you again.</h2>
            </header>

            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
