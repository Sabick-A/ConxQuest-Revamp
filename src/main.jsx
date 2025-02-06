import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Map = lazy(() => import('./pages/Map'));
const Page404 = lazy(() => import('./pages/Page404'));
const CardGame = lazy(() => import('./pages/CardGame.jsx'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Page404 />,
        children: [
            { index: true, element: <Home /> },
            { path: "map", element: <Map /> },
            { path: "games/cardgame", element: <CardGame /> },
            { path: "*", element: <Page404 /> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
