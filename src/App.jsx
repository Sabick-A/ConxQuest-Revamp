import Hero from "./components/Home/Hero";
import Navbar from "./components/Home/Navbar";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Suspense } from "react";

function App() {
    return (
        <ErrorBoundary>
            <div className="w-full min-h-screen flex flex-col">
                <Suspense fallback={
                    <div className="w-full h-screen flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-950"></div>
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                }>
                    <main className="flex-grow">
                        <Outlet />
                    </main>
                </Suspense>
            </div>
        </ErrorBoundary>
    );
}

export default App;
