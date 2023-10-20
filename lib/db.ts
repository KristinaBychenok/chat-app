import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://kristina_bychenok:C4xepkT2cAzbJYUI@cluster0.is2ob.mongodb.net/chat-app?retryWrites=true&w=majority"
  );

  return client;
}
