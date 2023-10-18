import { hashpassword, verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "PATCH") {
    return;
  }

    const session = req.body.session;

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user?.email;
  const oldPassport = req.body.oldPassword;
  const newPassport = req.body.newPassword;

  if (!newPassport || newPassport.trim().length < 7) {
    res.status(422).json({
      message: "Invalid new password (should be at least 7 characters)",
    });
    return;
  }

  const client = await connectToDatabase();
  const authCollection = client.db().collection("auth");
  const user = await authCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassport, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashpassword(newPassport);

  const result = await authCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();

  res.status(200).json({ message: "Password updated!" });
}

export default handler;
