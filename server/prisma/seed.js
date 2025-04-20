import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10)
  const hashedUserPassword = await bcrypt.hash('userpass', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
    },
  })
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'user@user.com',
      password: hashedUserPassword,//userpass
      role: 'user'
    }
  })

  const now = new Date()

  await prisma.marriageApplication.createMany({
    data: [
      {
        husbandName: 'John Pending',
        wifeName: 'Jane Pending',
        husbandCitizenshipNo: 'H123456',
        wifeCitizenshipNo: 'W654321',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10),
        witnessName: 'Alice Witness',
        witnessCitizenshipNo: 'WT9999',
        status: 'pending',
        userId: user.id
      },
      {
        husbandName: 'Bob Approved',
        wifeName: 'Rita Approved',
        husbandCitizenshipNo: 'B789012',
        wifeCitizenshipNo: 'W210987',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30),
        witnessName: 'Charlie Witness',
        witnessCitizenshipNo: 'WT8888',
        status: 'approved',
        userId: user.id
      },
      {
        husbandName: 'Sam Rejected',
        wifeName: 'Eve Rejected',
        husbandCitizenshipNo: 'S345678',
        wifeCitizenshipNo: 'E876543',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 60),
        witnessName: 'David Witness',
        witnessCitizenshipNo: 'WT7777',
        status: 'rejected',
        userId: user.id
      },
      {
        husbandName: 'Mike Pending',
        wifeName: 'Olivia Pending',
        husbandCitizenshipNo: 'M111222',
        wifeCitizenshipNo: 'O123456',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
        witnessName: 'Grace Witness',
        witnessCitizenshipNo: 'WT6666',
        status: 'pending',
        userId: user.id
      },
      {
        husbandName: 'Alex Approved',
        wifeName: 'Sophia Approved',
        husbandCitizenshipNo: 'A333444',
        wifeCitizenshipNo: 'S555666',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 45),
        witnessName: 'Lucas Witness',
        witnessCitizenshipNo: 'WT5555',
        status: 'approved',
        userId: user.id
      },
      {
        husbandName: 'Liam Rejected',
        wifeName: 'Emma Rejected',
        husbandCitizenshipNo: 'L777888',
        wifeCitizenshipNo: 'E999000',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 90),
        witnessName: 'Mia Witness',
        witnessCitizenshipNo: 'WT4444',
        status: 'rejected',
        userId: user.id
      },
      {
        husbandName: 'Ethan Pending',
        wifeName: 'Ava Pending',
        husbandCitizenshipNo: 'E123789',
        wifeCitizenshipNo: 'A654321',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 12),
        witnessName: 'Charlotte Witness',
        witnessCitizenshipNo: 'WT3333',
        status: 'pending',
        userId: user.id
      },
      {
        husbandName: 'Daniel Approved',
        wifeName: 'Isabella Approved',
        husbandCitizenshipNo: 'D222333',
        wifeCitizenshipNo: 'I444555',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 22),
        witnessName: 'Zoe Witness',
        witnessCitizenshipNo: 'WT2222',
        status: 'approved',
        userId: user.id
      },
      {
        husbandName: 'James Rejected',
        wifeName: 'Charlotte Rejected',
        husbandCitizenshipNo: 'J666777',
        wifeCitizenshipNo: 'C888999',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 120),
        witnessName: 'Benjamin Witness',
        witnessCitizenshipNo: 'WT1111',
        status: 'rejected',
        userId: user.id
      },
      {
        husbandName: 'William Pending',
        wifeName: 'Amelia Pending',
        husbandCitizenshipNo: 'W444555',
        wifeCitizenshipNo: 'A999000',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
        witnessName: 'Oliver Witness',
        witnessCitizenshipNo: 'WT0000',
        status: 'pending',
        userId: user.id
      },
      {
        husbandName: 'Henry Approved',
        wifeName: 'Mia Approved',
        husbandCitizenshipNo: 'H999000',
        wifeCitizenshipNo: 'M777888',
        dateOfMarriage: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 55),
        witnessName: 'Noah Witness',
        witnessCitizenshipNo: 'WT1234',
        status: 'approved',
        userId: user.id
      }
    ]
  })


  console.log('✅ Admin user created:', admin)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
