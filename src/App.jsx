import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import InitialLoader from "./components/common/InitialLoader";



function App() {
  return (
    <ErrorBoundary>
      <SpeedInsights />
      <Analytics />
      <div className="w-full min-h-screen flex flex-col">
        <Suspense fallback={<InitialLoader />}>
          <main className="flex-grow">
            <Outlet />
          </main>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
