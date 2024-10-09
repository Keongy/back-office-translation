// app/api/auth/[...nextauth]/route.ts

import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Configuration de NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Cherche l'utilisateur dans la base de données par nom d'utilisateur
        const user = await prisma.user.findUnique({
          where: {username: credentials.username},
        });

        // Si l'utilisateur existe et que le mot de passe est correct
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {id: user.id.toString(), name: user.username};
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Utilise JWT pour gérer les sessions
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({session, token}) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string, // Assure que l'ID utilisateur est inclus dans la session
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Rediriger vers la page de connexion personnalisée
  },
};

// Créer le handler pour NextAuth
const handler = NextAuth(authOptions);

// Exporter les méthodes HTTP en tant qu'exports nommés
export const GET = handler;
export const POST = handler;
