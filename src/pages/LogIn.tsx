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
      <div className="flex min-h-screen w-full">
        <div className="flex-[0] lg:flex-1 relative bg-[url('/login.jpg')] bg-cover bg-center"></div>

        <div className="flex-1 bg-[url('/login.jpg')] bg-cover bg-center lg:bg-none flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-sm lg:max-w-md z-10 w-full bg-bg-primary lg:bg-transparent shadow-xl lg:shadow-none p-6 sm:p-8">
            <header className="mb-8">
              <h1 className="font-garamond text-3xl lg:text-4xl font-bold text-accent">
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
