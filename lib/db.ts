import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.is2ob.mongodb.net/${process.env.mongodb_databasekey}?retryWrites=true&w=majority`
  );

  return client;
}
