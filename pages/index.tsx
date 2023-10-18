import StartingPageContent from "@/components/starting-page/starting-page";
import Head from "next/head";

function HomePage() {
  return (
    <>
      <Head>
        <title>Welcome to the Chat app</title>
        <meta name="desctoption" content="Welcome to the Chat app" />
      </Head>
      <StartingPageContent />;
    </>
  );
}

export default HomePage;
