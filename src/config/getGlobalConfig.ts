
interface GlobalConfig {
  channelAccessToken?: string;
  channelSecret?: string;
  jwtToken?: string;
}

export default function getGlobalConfig() {
  const config: GlobalConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
    jwtToken: process.env.JWT_TOKEN,
  };
  return config;
}
