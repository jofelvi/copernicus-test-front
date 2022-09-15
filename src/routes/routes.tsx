import { BrowserRouter,  Routes, Route, Link  } from "react-router-dom";
import PageOne from "../views/PageOne";
import Pagetwo from "../views/Pagetwo";
import PageFormUser from "../views/PageFormUser";

const  RoutesRoot = () => {
    return (
            <Routes>
                <Route path="/" element={<PageOne />} />
                <Route path="/users" element={<Pagetwo />} />
                <Route path="/form/:id" element={<PageFormUser />} />
                <Route path="/form" element={<PageFormUser />} />
            </Routes>
    );
}

export default RoutesRoot;
