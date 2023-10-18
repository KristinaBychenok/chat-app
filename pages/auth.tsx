import AuthForm from "@/components/auth/auth-form";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta
          name="desctoption"
          content="Here you can Sign In or create account"
        />
      </Head>
      <AuthForm />;
    </>
  );
}

export default AuthPage;
