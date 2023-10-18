import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://user-1:6bbhyG3xzPfuk4I1@cluster0.is2ob.mongodb.net/chat-app?retryWrites=true&w=majority"
  );

  return client;
}
