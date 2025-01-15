import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Home,Map,Page404} from './pages/index.js'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // // Public Routes
            { index: true, element: <Home/> }, // Default route for "/"
            { path: "map", element: <Map/> },
            // { path: "signup", element: <AuthLayout authentication={false}><SignUp /></AuthLayout> },
            // // Post Routes
            // { path: "post", element: <AuthLayout authentication={true}><MyPosts /></AuthLayout> },
            // { path: "post/new", element: <AuthLayout authentication={true}> <NewPost /> </AuthLayout>},
            // { path: "post/:slug", element: <ShowPost /> },
            // { path: "post/edit/:slug", element: <AuthLayout authentication={true}> <EditPost /></AuthLayout> },
            // //404 Route
            { path: "*", element: <Page404/> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
