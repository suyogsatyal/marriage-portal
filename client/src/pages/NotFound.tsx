import { Button } from "../components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <div className="space-y-6 max-w-md">
                {/* <AlertCircle className="h-24 w-24 text-red-500 mx-auto" /> */}
                <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
                <p className="text-lg text-muted-foreground">Sorry, we couldn't find the page you're looking for.</p>
                <Button asChild size="lg">
                    <a href="/">Return to home</a>
                </Button>
            </div>
        </div>
    )
}
