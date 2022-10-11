module.exports = {
  apps: [
    {
      name: "username-bot",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        TG_API_ID: 24087014,
        TG_API_HASH: "93f7d0fb8fff78d046b1751481ba106b",
        TG_API_IP: "149.154.167.50",
        TG_API_DC: 2,
      },
    },
  ],
};
