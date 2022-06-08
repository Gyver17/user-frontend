import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ListUser from "../pages/ListUser/ListUser.component"
import SignIn from "../pages/SignIn/SignIn.component";
import SignUp from "../pages/SignUp/SingUp.component";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.component";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.context";
import SessionExpired from "../components/SessionExpired/SessionExpired.component";

function AppRouter() {
    const [state] = useContext(AuthContext);
    const { sessionExpired } = state;

    return (
        <Router>
            <Routes>
                {/*Privete Routes*/}
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<ListUser />} />
                </Route>
                {/*Public Routes*/}
                <Route element={<PublicRoutes />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {sessionExpired && <SessionExpired serverError={false} />}
        </Router>
    );
}

export default AppRouter;
