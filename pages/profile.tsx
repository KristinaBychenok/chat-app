import UserProfile from "@/components/profile/user-profile";
import { getSession } from "next-auth/react";
import Head from "next/head";

function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="desctoption" content="Here you can see your profile" />
      </Head>
      <UserProfile />;
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
