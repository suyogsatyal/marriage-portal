// src/pages/shared/CertificatePage.tsx
import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import MarriageCertificate from '../../components/MarriageCertificate'
import NotFound from '../NotFound'
import { getMyApplicationById, getApplicationById } from '../../utils/api'

const CertificatePage = () => {
    const { id } = useParams()
    const { pathname } = useLocation()
    const [application, setApplication] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const applicationId = Number(id)
                const isAdmin = pathname.includes('/admin/')
                const response = isAdmin
                    ? await getApplicationById(applicationId)
                    : await getMyApplicationById(applicationId)

                setApplication(response.data)
            } catch (err) {
                setApplication(null)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchApplication()
    }, [id, pathname])

    if (loading) return <p>Loading...</p>
    if (!application || application.status !== 'approved') return <NotFound />

    return (
        <div className="flex flex-col items-center p-4 gap-6">
            <h1 className="text-xl font-bold">Marriage Certificate</h1>

            <PDFViewer width="100%" height={600}>
                <MarriageCertificate application={application} />
            </PDFViewer>

            <PDFDownloadLink
                document={<MarriageCertificate application={application} />}
                fileName={`Marriage-Certificate-${application.id}.pdf`}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
                {({ loading }) => loading ? 'Preparing PDF...' : 'Download PDF'}
            </PDFDownloadLink>
        </div>
    )
}

export default CertificatePage
