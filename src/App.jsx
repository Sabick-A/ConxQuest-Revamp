import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Map from "./pages/Map";
import CardQuest from "./pages/Games/CardQuest";

function App() {
  return (
    <ErrorBoundary>
      <SpeedInsights />
      <Analytics />
      <div className="w-full min-h-screen flex flex-col">
        <Suspense
          fallback={
            <div className="w-full h-screen flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-950"></div>
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            </div>
          }
        >
          <main className="flex-grow">
            <Outlet />
          </main>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
