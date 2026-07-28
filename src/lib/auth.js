import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db(process.env.PROJECT_ID);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },

      isBlocked: {
        type: "boolean",
        defaultValue: false,
      },

      profession: {
        type: "string",
        defaultValue: "",
      },

      country: {
        type: "string",
        defaultValue: "",
      },

      phone: {
        type: "string",
        defaultValue: "",
      },

      bio: {
        type: "string",
        defaultValue: "",
      },

      receiveLessonUpdates: {
        type: "boolean",
        defaultValue: true,
      },

      receiveNewsletter: {
        type: "boolean",
        defaultValue: true,
      },
    },
  },
});
