"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyApplications } from "../../utils/api"
import { notifyError } from "../../utils/notify"
// import { Badge } from "@/components/ui/badge"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Navbar from "../../components/Navbar"

interface Application {
    id: number
    husbandName: string
    wifeName: string
    status: "pending" | "approved" | "rejected"
}

const UserDashboard = () => {
    console.log("helo guys")
    const [applications, setApplications] = useState<Application[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await getMyApplications()
                const filtered = res.data.map((app: any) => ({
                    id: app.id,
                    husbandName: app.husbandName,
                    wifeName: app.wifeName,
                    status: app.status,
                }))
                setApplications(filtered)
            } catch (err) {
                notifyError("Failed to fetch applications")
            }
        }

        fetchApplications()
    }, [])

    const grouped = {
        pending: applications.filter((a) => a.status === "pending"),
        approved: applications.filter((a) => a.status === "approved"),
        rejected: applications.filter((a) => a.status === "rejected"),
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-amber-50 border-amber-200"
            case "approved":
                return "bg-emerald-50 border-emerald-200"
            case "rejected":
                return "bg-rose-50 border-rose-200"
            default:
                return "bg-gray-50 border-gray-200"
        }
    }

    const renderTable = (title: string, apps: Application[], status: string) => (
        <Card className="mb-6 border shadow-sm p-0 gap-0">
            <CardHeader className={`${getStatusColor(status)} py-4 px-6 border-b rounded-t-2xl`}>
                <CardTitle className="text-xl font-medium flex items-center">
                    {title}
                    <Badge
                        variant={status === "pending" ? "secondary" : status === "approved" ? "default" : "destructive"}
                        className="ml-2"
                    >
                        {apps.length}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {apps.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="text-left font-medium text-muted-foreground py-3 px-6 w-24">ID</th>
                                    <th className="text-left font-medium text-muted-foreground py-3 px-6">Husband</th>
                                    <th className="text-left font-medium text-muted-foreground py-3 px-6">Wife</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apps.map((app) => (
                                    <tr
                                        key={app.id}
                                        className="cursor-pointer border-t hover:bg-muted/50 transition-colors"
                                        onClick={() =>
                                            navigate(app.status === 'approved' ? `/view/application/${app.id}` : `/user/application/${app.id}`)
                                        }
                                    >
                                        <td className="py-3 px-6 text-sm">{app.id}</td>
                                        <td className="py-3 px-6">{app.husbandName}</td>
                                        <td className="py-3 px-6">{app.wifeName}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-8 text-center text-muted-foreground">No {status} applications found</div>
                )}
            </CardContent>
        </Card>
    )


    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex justify-end max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white flex items-center" onClick={() => navigate("/application/new")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    New Application
                </Button>
            </div>
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderTable("Pending Applications", grouped.pending, "pending")}
                {renderTable("Approved Applications", grouped.approved, "approved")}
                {renderTable("Rejected Applications", grouped.rejected, "rejected")}
            </main>
        </div>
    )
}

export default UserDashboard
