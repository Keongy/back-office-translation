import NextAuth, {DefaultSession} from "next-auth";
import {JWT} from "next-auth/jwt";

// Étendre l'interface `Session` de `next-auth`
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Ajoute `id` comme propriété supplémentaire
    } & DefaultSession["user"]; // Préserve les propriétés existantes (`name`, `email`, `image`)
  }
}

// Étendre l'interface `JWT` de `next-auth`
declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Ajoute `id` comme propriété supplémentaire dans le token JWT
  }
}
