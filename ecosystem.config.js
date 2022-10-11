module.exports = {
  apps: [
    {
      name: "username-bot",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
