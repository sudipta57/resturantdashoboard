import ResturantInfo from "@/models/resturantinfo";
import dbConnect from "@/utils/connection";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your user lookup and password verification logic
        const user = await findUserByEmail(credentials.email);

        // Verify the password against the hashed password stored in the database
        if (user && credentials.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function findUserByEmail(email) {
  await dbConnect();
  const userxist = await ResturantInfo.findOne({ email });
  return userxist;
}
