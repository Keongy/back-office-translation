import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME!;
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD environment variable is not set.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    console.log(
      `L'utilisateur ${username} existe déjà dans la base de données.`
    );
  } else {
    if (!username) {
      throw new Error("ADMIN_USERNAME environment variable is not set.");
    }
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    console.log(`Utilisateur ${username} créé avec succès.`);
  }
}

main()
  .then(() => {
    console.log("Script seed terminé.");
  })
  .catch((e) => {
    console.error(e);
  });
