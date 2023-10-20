import ChatConversation from "@/components/chat-conversation/chat-conversation";
import { getSession } from "next-auth/react";
import Head from "next/head";

function ChatPage() {
  return (
    <>
      <Head>
        <title>Your Chat</title>
        <meta name="desctoption" content="Here you can chat with chat GPT" />
      </Head>
      <ChatConversation />;
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

export default ChatPage;
