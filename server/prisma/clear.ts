import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.certificate.deleteMany()
    await prisma.marriageApplication.deleteMany()
    await prisma.user.deleteMany()

    console.log('🧹 Database cleared.')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
