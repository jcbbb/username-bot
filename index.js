import input from "input";
import { TelegramClient, Api } from "telegram";
import { StoreSession } from "telegram/sessions/index.js";

const UPDATE_INTERVAL = 1000 * 30; // 30 seconds
const API_ID = parseInt(process.env.TG_API_ID, 10);
const API_DC = parseInt(process.env.TG_API_DC, 10);
const API_IP = parseInt(process.env.TG_API_IP, 10);
const API_HASH = process.env.TG_API_HASH;
const store_session = new StoreSession("");

const client = new TelegramClient(store_session, API_ID, API_HASH, {
  connectionRetries: 5,
});

client.session.setDC(API_DC, API_IP, 443);

const formatter = new Intl.DateTimeFormat("ru", {
  minute: "numeric",
  hour: "numeric",
});

(async function run() {
  await client.start({
    phoneNumber: async () => await input.text("Phone number: "),
    phoneCode: async () => await input.text("Code: "),
    password: async () => await input.text("Password: "),
    onError: (err) => console.error(err),
  });

  client.session.save();
  await client.connect();

  const me = await client.getMe();

  const update_me = async () => {
    await client.invoke(
      new Api.account.UpdateProfile({
        firstName: `${me.firstName} | ${formatter.format(new Date())}`,
      })
    );
    setTimeout(update_me, UPDATE_INTERVAL);
  };

  update_me();
})();
