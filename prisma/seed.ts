import { PrismaClient } from "@prisma/client";
import {hash} from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  const user = await prisma.user.create ({
    data: {
      name: "Bruno",
      email: "bruno@gmail.com",
      password: await hash("password", 10),
    }
  });

  console.log(user);
}

main().catch((e) => {
  console.error("❌ Error during seed:");
  console.error(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});