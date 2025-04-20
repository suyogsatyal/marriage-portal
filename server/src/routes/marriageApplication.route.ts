import { Router } from 'express'
import {
  createMarriageApplication,
  getUserApplications,
  getAllApplications,
  updateApplicationStatus,
  getOneUserApplication,
  deleteOneUserApplication,
  getOneApplication,
  editMyApplication,
} from '../controllers/marriageApplication.controller'
import { protect, adminOnly } from '../middleware/authMiddleware'

const applicationRouter = Router()

// User
applicationRouter.post('/applications', protect, createMarriageApplication)
applicationRouter.get('/applications/me', protect, getUserApplications)
applicationRouter.put('/applications/me/:id', protect, editMyApplication)
applicationRouter.get('/applications/me/:id', protect, getOneUserApplication) // This should be for a specific application
applicationRouter.delete('/applications/me/:id', protect, deleteOneUserApplication) // This should be for a specific application
// Admin
applicationRouter.get('/applications', protect, adminOnly, getAllApplications)
applicationRouter.get('/applications/:id', protect, adminOnly, getOneApplication) // This should be for a specific application
applicationRouter.put('/applications/:id/status', protect, adminOnly, updateApplicationStatus)

export default applicationRouter
