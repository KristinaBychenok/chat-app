import type { NextApiRequest, NextApiResponse } from "next";
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

type Data = {
  message: string | null;
  answer?: string | null;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return;
  }

  try {
    const client = new OpenAIClient(
      "https://ai-proxy.lab.epam.com",
      new AzureKeyCredential(process.env.azure_Key_Credential)
    );

    const events = client.listChatCompletions("gpt-35-turbo", [
      { role: "user", content: req.body.question },
    ]);

    let resp = "";
    for await (const event of events) {
      for (const choice of event.choices) {
        const delta = choice.delta?.content;
        if (delta !== undefined) {
          resp += delta;
        }
      }
    }

    res
      .status(200)
      .json({ message: "Your reply has been received!", answer: resp });
  } catch (error) {
    res.status(500).json({ message: `Someting went wrong: ${error}` });
    console.error("The sample encountered an error:", error);
  }
}

export default handler;
