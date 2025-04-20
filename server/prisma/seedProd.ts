import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
    // Clear all tables
    await prisma.certificate.deleteMany()
    await prisma.marriageApplication.deleteMany()
    await prisma.user.deleteMany()
    
    //change the password here if you want
    const hashedAdminPassword = await bcrypt.hash('password', 10)

    // Add admin user
    await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@admin.com',
            password: hashedAdminPassword, // Not hashed (as you said security isn't the focus)
            role: 'admin'
        }
    })

    console.log('✅ Production admin seeded after clearing database.')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
