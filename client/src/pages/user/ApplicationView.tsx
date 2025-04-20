"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { getMyApplicationById, updateApplicationStatus } from "../../utils/api"
import { toast } from "react-toastify"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { CheckCircle, XCircle, ArrowLeft, Calendar, User, FileText } from "lucide-react"

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

const ApplicationView = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [application, setApplication] = useState<Application | null>(null)
    const [dialogOpen, setDialogOpen] = useState<false | "approve" | "reject">(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        if(dialogOpen && loading &&(2<1)){
            handleConfirm
        }
        getMyApplicationById(Number(id))
            .then((res:any) => setApplication(res.data))
            .catch(() => toast.error("Failed to load application"))
    }, [id])


    const handleConfirm = async (status: "approved" | "rejected") => {
        if (!id) return
        setLoading(true)
        try {
            await updateApplicationStatus(Number(id), status)
            toast.success(`Application ${status}`)
            setDialogOpen(false)
            navigate("/admin/dashboard")
        } catch {
            toast.error("Failed to update status")
        } finally {
            setLoading(false)
        }
    }

    if (!application) {
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
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate("/admin/dashboard")}>
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back
                    </Button>
                    <h1 className="text-xl font-semibold text-gray-900">Application #{application.id}</h1>
                    <div className="ml-auto">{getStatusBadge(application.status)}</div>
                </div>

                <Card className="shadow-sm border mb-6">
                    <CardHeader className="pb-2 border-b">
                        <CardTitle className="text-lg font-medium">Couple Information</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center text-sm">
                                    <User className="h-4 w-4 mr-2 text-gray-400" />
                                    <span className="font-medium">Husband Details</span>
                                </div>
                                <Detail label="Name" value={application.husbandName} />
                                <Detail label="Citizenship No" value={application.husbandCitizenshipNo} />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center text-sm">
                                    <User className="h-4 w-4 mr-2 text-gray-400" />
                                    <span className="font-medium">Wife Details</span>
                                </div>
                                <Detail label="Name" value={application.wifeName} />
                                <Detail label="Citizenship No" value={application.wifeCitizenshipNo} />
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
                            <div className="flex items-center mb-2">
                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-sm font-medium">Date of Marriage</span>
                                <span className="ml-auto text-sm">{new Date(application.dateOfMarriage).toDateString()}</span>
                            </div>
                            <Separator />
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center text-sm">
                                    <FileText className="h-4 w-4 mr-2 text-gray-400" />
                                    <span className="font-medium">Witness Information</span>
                                </div>
                                <Detail label="Name" value={application.witnessName} />
                                <Detail label="Citizenship No" value={application.witnessCitizenshipNo} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {application.status === "pending" && (
                    <div className="flex gap-4 justify-end">
                        <Button
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => setDialogOpen("reject")}
                        >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setDialogOpen("approve")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                        </Button>
                    </div>
                )}
                {application.status === "approved" && (
                    <div className="flex gap-4 justify-end">
                        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate(`/user/certificate/${application.id}`)}>
                            Generate Cerificate
                        </Button>
                    </div>
                )}
            </main>
        </div>
    )
}

const Detail = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
)

export default ApplicationView
