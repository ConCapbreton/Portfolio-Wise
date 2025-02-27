import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import LoginSignUpPage from "../pages/LoginSignUpPage/LoginSignUpPage.js"
import PortfolioPage from "../pages/PortfolioPages/MyPortfolioPage.js"
import UserListPage from "../pages/UserListPage/UserListPage.js"
import UserPortfolioPage from "../pages/PortfolioPages/UserPortfolioPage.js";
import ErrorPage from "../pages/ErrorPage.js";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/", element: <LoginSignUpPage />},
            {path: "/portfolio", element: <PortfolioPage />},
            {path: "/userlist", element: <UserListPage />},
            {path: "/userportfolio/:id/:username", element: <UserPortfolioPage />},
        ],
    },
]);