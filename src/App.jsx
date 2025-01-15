import Hero from "./components/Home/Hero";
import Navbar from "./components/Home/Navbar";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
