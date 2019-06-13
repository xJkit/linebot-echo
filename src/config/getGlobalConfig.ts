
interface GlobalConfig {
  channelAccessToken?: string;
  channelSecret?: string;
}

export default function getGlobalConfig() {
  const config: GlobalConfig = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret,
  };
  return config;
}
