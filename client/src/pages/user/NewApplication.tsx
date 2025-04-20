"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { submitApplication } from "../../utils/api"
import { toast } from "react-toastify"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
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
import { ArrowLeft, Calendar, User, FileText, Save } from "lucide-react"

const NewApplication = () => {
    const navigate = useNavigate()
    // const [formData, setFormData] = useState<FormData | null>(null)
    const [dialogOpen, setDialogOpen] = useState<false | "approve" | "reject" | "edit">(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        husbandName: "",
        wifeName: "",
        husbandCitizenshipNo: "",
        wifeCitizenshipNo: "",
        dateOfMarriage: "",
        witnessName: "",
        witnessCitizenshipNo: ""
      })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleFormSubmit = async () => {
        console.log("submitting")
        console.log(formData)
        if (!formData) return
        setLoading(true)
        try {
            await submitApplication(formData)
            setDialogOpen(false)
            toast.success("Application sent successfully")
            // Update the local application state with the new data
            setTimeout(() => {
                navigate("/dashboard")
            }, 3000)
        } catch {
            toast.error("Failed to update application")
        } finally {
            setLoading(false)
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
                    <h1 className="text-xl font-semibold text-gray-900">New Application</h1>
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
                                            // value={formData.husbandName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="husbandCitizenshipNo">Citizenship No</Label>
                                        <Input
                                            id="husbandCitizenshipNo"
                                            name="husbandCitizenshipNo"
                                            // value={formData.husbandCitizenshipNo}
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
                                            // value={formData.wifeName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="wifeCitizenshipNo">Citizenship No</Label>
                                        <Input
                                            id="wifeCitizenshipNo"
                                            name="wifeCitizenshipNo"
                                            // value={formData.wifeCitizenshipNo}
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
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="witnessCitizenshipNo">Citizenship No</Label>
                                        <Input
                                            id="witnessCitizenshipNo"
                                            name="witnessCitizenshipNo"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4 justify-end">
                        <Button type="submit" variant="default" className="bg-blue-600 hover:bg-blue-700">
                            <Save className="h-4 w-4 mr-2" />
                            Submit
                        </Button>
                    </div>
                </form>
            </main>

            {/* Status Update Dialog */}

            {/* Edit Confirmation Dialog */}
            <Dialog open={dialogOpen === "edit"} onOpenChange={() => setDialogOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Submit</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to submit this application? Please review your application before confirming.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={loading} onClick={handleFormSubmit}>
                            {loading ? "Saving..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewApplication