import { db } from "../../prisma/db";

// types

type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
};

export async function createUser() {
  try {
    const user = await db.orm.public.User.create({
      email: "kenebebhbanigo@gmail.com",
      firstName: "Kenebebh",
      lastName: "Banigo",
      passwordHash: "123456",
    });

    console.log("User created:", user);
    return user;
  } catch (error) {
    if ((error as { sqlState?: string }).sqlState === "23505") {
      // that email is already taken
    }
    console.error("Failed to create user:", error);
  }
}

await createUser();
