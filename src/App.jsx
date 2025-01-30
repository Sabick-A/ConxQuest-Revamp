import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Suspense } from "react";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react"

function App() {
    return (
        <ErrorBoundary>
            <SpeedInsights />
            <Analytics />
            <Suspense fallback={<div>Loading...</div>}>
                <main className="min-h-screen">
                    <Outlet />
                </main>
            </Suspense>
        </ErrorBoundary>
    );
}

export default App;
