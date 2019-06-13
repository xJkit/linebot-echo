
interface GlobalConfig {
  channelAccessToken?: string;
  channelSecret?: string;
}

export default function getGlobalConfig() {
  const config: GlobalConfig = {};

  if (process.env.NODE_ENV === 'production') {
    config.channelAccessToken = CHANNEL_ACCESS_TOKEN;
    config.channelSecret = CHANNEL_SECRET;
  } else {
    config.channelAccessToken = process.env.channelAccessToken;
    config.channelSecret = process.env.channelSecret;
  }
  return config;
}
