/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: "kristina_bychenok",
    mongodb_password: "C4xepkT2cAzbJYUI",
    mongodb_clustername: "cluster0",
    mongodb_databasekey: "chat-app",
    azure_Key_Credential: "ab89922f25084bf1a33e3db1db9a8997",
  },
};

module.exports = nextConfig;
