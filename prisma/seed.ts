import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt'

async function main() {
  console.log("Seeding database...");
  
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email: "admin@gmail.com",
    }
  });
  
  if(!userAlreadyExists) { 
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@gmail.com",
        password: await bcrypt.hash("admin", 10),
        posts: {
          create: [{
            title: "First Post",
            },
            {
              title: "Second Post",
            },
          ]
        }
      }
    });
  } 

  console.log("Database seeded successfully");
}

main().catch((e) => {
  console.error("❌ Error during seed:");
  console.error(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});