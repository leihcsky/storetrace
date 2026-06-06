/** PM2 config — storetrace listens on 3001 so it does not clash with other apps on 3000. */
module.exports = {
  apps: [
    {
      name: "storetrace",
      cwd: "/var/www/storetrace",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        NEXT_PUBLIC_GA_ID: "G-8GPRHS183R",
      },
    },
  ],
};
