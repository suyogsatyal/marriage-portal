import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/authMiddleware'

const prisma = new PrismaClient()

export const createMarriageApplication = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        console.log('🔄 Creating marriage application...')

        const {
            husbandName, wifeName,
            husbandCitizenshipNo, wifeCitizenshipNo,
            dateOfMarriage,
            witnessName, witnessCitizenshipNo,
        } = req.body

        if (!req.user) return res.status(401).json({ message: 'Unauthorized: No user found in request' })

        const application = await prisma.marriageApplication.create({
            data: {
                husbandName,
                wifeName,
                husbandCitizenshipNo,
                wifeCitizenshipNo,
                dateOfMarriage: new Date(dateOfMarriage),
                witnessName,
                witnessCitizenshipNo,
                status: 'pending',
                user: { connect: { id: req.user.id } },
            },
        })

        console.log('✅ Application created successfully')
        res.status(201).json(application)
    } catch (error) {
        console.error('❌ Error creating application:', error)
        res.status(500).json({ message: 'Failed to create application. Please try again later.' })
    }
}

export const editMyApplication = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const {
            husbandName, wifeName,
            husbandCitizenshipNo, wifeCitizenshipNo,
            dateOfMarriage,
            witnessName, witnessCitizenshipNo,
        } = req.body

        console.log(`✏️ Editing application ID ${id}`)

        if (!req.user) return res.status(401).json({ message: 'Unauthorized: User not found' })

        const app = await prisma.marriageApplication.findUnique({ where: { id: Number(id) } })
        if (!app || app.userId !== req.user.id) {
            return res.status(404).json({ message: 'Application not found or not authorized to edit' })
        }

        if ((app.status !== 'pending') && (app.status !== 'rejected')) {
            console.log('❌ Application is not pending or rejected')
            return res.status(400).json({ message: 'Only pending applications can be edited' })
        }

        const updated = await prisma.marriageApplication.update({
            where: { id: Number(id) },
            data: {
                husbandName,
                wifeName,
                husbandCitizenshipNo,
                wifeCitizenshipNo,
                dateOfMarriage: new Date(dateOfMarriage),
                witnessName,
                witnessCitizenshipNo,
            },
        })

        console.log('✅ Application updated successfully')
        res.json(updated)
    } catch (error) {
        console.error('❌ Error editing application:', error)
        res.status(500).json({ message: 'Error while editing application' })
    }
}

export const getUserApplications = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        console.log(`📥 Fetching applications for user ID ${req.user?.id}`)

        if (!req.user) return res.status(401).json({ message: 'Unauthorized: No user found' })

        const apps = await prisma.marriageApplication.findMany({
            where: { userId: req.user.id },
            include: { certificate: true },
        })

        console.log(`✅ Fetched ${apps.length} applications for user`)
        res.json(apps)
    } catch (error) {
        console.error('❌ Error fetching user applications:', error)
        res.status(500).json({ message: 'Could not fetch applications' })
    }
}

export const getOneUserApplication = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        console.log(`📥 Fetching application ID ${id} for user ID ${req.user?.id}`)

        if (!req.user) return res.status(401).json({ message: 'Unauthorized: No user found' })

        const application = await prisma.marriageApplication.findUnique({
            where: { id: Number(id) },
            include: { certificate: true },
        })

        if (!application || application.userId !== req.user.id) {
            return res.status(404).json({ message: 'Application not found or not authorized to view' })
        }

        console.log(`✅ Fetched application ID ${id} for user`)
        res.json(application)
    } catch (error) {
        console.error('❌ Error fetching application:', error)
        res.status(500).json({ message: 'Could not fetch application' })
    }
}

export const deleteOneUserApplication = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        console.log(`🗑️ Deleting application ID ${id} for user ID ${req.user?.id}`)

        if (!req.user) return res.status(401).json({ message: 'Unauthorized: No user found' })

        const application = await prisma.marriageApplication.findUnique({
            where: { id: Number(id) },
        })

        if (!application || application.userId !== req.user.id) {
            return res.status(404).json({ message: 'Application not found or not authorized to delete' })
        }

        await prisma.marriageApplication.delete({ where: { id: Number(id) } })

        console.log(`✅ Deleted application ID ${id} for user`)
        res.json({ message: 'Application deleted successfully' })
    } catch (error) {
        console.error('❌ Error deleting application:', error)
        res.status(500).json({ message: 'Could not delete application' })
    }
}

export const getAllApplications = async (req: Request, res: Response): Promise<any> => {
    try {
        console.log('👮 Admin: Fetching all applications...')

        const applications = await prisma.marriageApplication.findMany({
            include: { user: true, certificate: true },
        })

        console.log(`✅ Admin fetched ${applications.length} applications`)
        res.json(applications)
    } catch (error) {
        console.error('❌ Admin error fetching applications:', error)
        res.status(500).json({ message: 'Error fetching all applications' })
    }
}

export const getOneApplication = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        console.log(`👮 Admin: Fetching application ID ${id}`)

        const application = await prisma.marriageApplication.findUnique({
            where: { id: Number(id) },
            include: { user: true, certificate: true },
        })

        if (!application) {
            return res.status(404).json({ message: 'Application not found' })
        }

        console.log(`✅ Admin fetched application ID ${id}`)
        res.json(application)
    }
    catch (error) {
        console.error('❌ Admin error fetching application:', error)
        res.status(500).json({ message: 'Error fetching application' })
    }
}

export const updateApplicationStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const { status } = req.body

        console.log(`🔄 Updating status of application ID ${id} to ${status}`)

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Must be approved or rejected' })
        }

        const updatedApp = await prisma.marriageApplication.update({
            where: { id: Number(id) },
            data: { status },
        })

        console.log(`✅ Status updated for application ID ${id}`)
        res.json(updatedApp)
    } catch (error) {
        console.error('❌ Error updating application status:', error)
        res.status(500).json({ message: 'Status update failed' })
    }

}
