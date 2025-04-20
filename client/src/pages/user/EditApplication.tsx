"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { deleteApplication, getMyApplicationById, updateMyApplication } from "../../utils/api"
import { toast } from "react-toastify"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog"
import { XCircle, ArrowLeft, Calendar, User, FileText, Save } from "lucide-react"

interface Application {
    id: number
    husbandName: string
    wifeName: string
    husbandCitizenshipNo: string
    wifeCitizenshipNo: string
    dateOfMarriage: string
    witnessName: string
    witnessCitizenshipNo: string
    status: "pending" | "approved" | "rejected"
    userId: number
}

type FormData = Omit<Application, "id" | "status" | "userId">

const EditApplication = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [application, setApplication] = useState<Application | null>(null)
    const [formData, setFormData] = useState<FormData | null>(null)
    const [dialogOpen, setDialogOpen] = useState<false | "approve" | "reject" | "edit">(false)
    const [loading, setLoading] = useState(false)
    const [formChanged, setFormChanged] = useState(false)

    useEffect(() => {
        if (!id) return

        getMyApplicationById(Number(id))
            .then((res) => {
                setApplication(res.data)
                setFormData({
                    husbandName: res.data.husbandName,
                    wifeName: res.data.wifeName,
                    husbandCitizenshipNo: res.data.husbandCitizenshipNo,
                    wifeCitizenshipNo: res.data.wifeCitizenshipNo,
                    dateOfMarriage: res.data.dateOfMarriage,
                    witnessName: res.data.witnessName,
                    witnessCitizenshipNo: res.data.witnessCitizenshipNo,
                })
            })
            .catch(() => toast.error("Failed to load application"))
    }, [id])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return

        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
        setFormChanged(true)
    }

    const handleStatusUpdate = async (status: "approved" | "rejected") => {
        if (!id) return
        setLoading(true)
        try {
            await deleteApplication(Number(id))
            toast.success(`Application ${status}`)
            setDialogOpen(false)
            setTimeout(() => {
                navigate("/dashboard")
            }, 3000)

        } catch {
            toast.error("Failed to delete application")
        } finally {
            setLoading(false)
        }
    }

    const handleFormSubmit = async () => {
        if (!id || !formData) return
        setLoading(true)
        try {
            await updateMyApplication(Number(id), formData)
            toast.success("Application updated successfully")
            setDialogOpen(false)
            // Update the local application state with the new data
            if (application) {
                setApplication({
                    ...application,
                    ...formData,
                })
            }
            setFormChanged(false)
        } catch {
            toast.error("Failed to update application")
        } finally {
            setLoading(false)
        }
    }

    if (!application || !formData) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading application...</p>
                </div>
            </div>
        )
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
            case "approved":
                return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Approved</Badge>
            case "rejected":
                return <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100">Rejected</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate("/dashboard")}>
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back
                    </Button>
                    <h1 className="text-xl font-semibold text-gray-900">Edit Application #{application.id}</h1>
                    <div className="ml-auto">{getStatusBadge(application.status)}</div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        setDialogOpen("edit")
                    }}
                >
                    <Card className="shadow-sm border mb-6">
                        <CardHeader className="pb-2 border-b">
                            <CardTitle className="text-lg font-medium">Couple Information</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm mb-2">
                                        <User className="h-4 w-4 mr-2 text-gray-400" />
                                        <span className="font-medium">Husband Details</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="husbandName">Name</Label>
                                        <Input
                                            id="husbandName"
                                            name="husbandName"
                                            value={formData.husbandName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="husbandCitizenshipNo">Citizenship No</Label>
                                        <Input
                                            id="husbandCitizenshipNo"
                                            name="husbandCitizenshipNo"
                                            value={formData.husbandCitizenshipNo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center text-sm mb-2">
                                        <User className="h-4 w-4 mr-2 text-gray-400" />
                                        <span className="font-medium">Wife Details</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="wifeName">Name</Label>
                                        <Input
                                            id="wifeName"
                                            name="wifeName"
                                            value={formData.wifeName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="wifeCitizenshipNo">Citizenship No</Label>
                                        <Input
                                            id="wifeCitizenshipNo"
                                            name="wifeCitizenshipNo"
                                            value={formData.wifeCitizenshipNo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border mb-6">
                        <CardHeader className="pb-2 border-b">
                            <CardTitle className="text-lg font-medium">Marriage Information</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center mb-2">
                                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                        <Label htmlFor="dateOfMarriage">Date of Marriage</Label>
                                    </div>
                                    <Input
                                        id="dateOfMarriage"
                                        name="dateOfMarriage"
                                        type="date"
                                        value={formData.dateOfMarriage.split("T")[0]}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-4">
                                    <div className="flex items-center text-sm mb-2">
                                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                                        <span className="font-medium">Witness Information</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="witnessName">Name</Label>
                                        <Input
                                            id="witnessName"
                                            name="witnessName"
                                            value={formData.witnessName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="witnessCitizenshipNo">Citizenship No</Label>
                                        <Input
                                            id="witnessCitizenshipNo"
                                            name="witnessCitizenshipNo"
                                            value={formData.witnessCitizenshipNo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4 justify-end">
                        {application.status === "pending" && (
                            <>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() => setDialogOpen("reject")}
                                >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                            </>
                        )}
                        <Button type="submit" variant="default" disabled={!formChanged} className="bg-blue-600 hover:bg-blue-700">
                            <Save className="h-4 w-4 mr-2" />
                            Confirm Edit
                        </Button>
                    </div>
                </form>
            </main>

            {/* Status Update Dialog */}
            <Dialog open={dialogOpen === "approve" || dialogOpen === "reject"} onOpenChange={() => setDialogOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{dialogOpen === "approve" ? "Confirm Approval" : "Confirm Deletion"}</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to {dialogOpen === "approve" ? "approve" : "delete"} this application? This action
                            cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant={dialogOpen === "approve" ? "default" : "destructive"}
                            disabled={loading}
                            onClick={() => dialogOpen && handleStatusUpdate(dialogOpen === "approve" ? "approved" : "rejected")}
                        >
                            {loading ? "Processing..." : "Confirm"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Confirmation Dialog */}
            <Dialog open={dialogOpen === "edit"} onOpenChange={() => setDialogOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Changes</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to update this application? Please review your changes before confirming.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 text-sm">
                        <h4 className="font-medium mb-2">Summary of Changes:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                            {application &&
                                formData &&
                                Object.keys(formData)
                                    .map((key) => {
                                        const typedKey = key as keyof FormData
                                        const originalValue = application[typedKey as keyof Application]
                                        const newValue = formData[typedKey]

                                        if (originalValue !== newValue) {
                                            return (
                                                <li key={key} className="flex justify-between">
                                                    <span>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</span>
                                                    <span className="font-medium text-foreground">
                                                        {key === "dateOfMarriage"
                                                            ? new Date(newValue as string).toLocaleDateString()
                                                            : (newValue as string)}
                                                    </span>
                                                </li>
                                            )
                                        }
                                        return null
                                    })
                                    .filter(Boolean)}
                        </ul>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={loading} onClick={handleFormSubmit}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditApplication
