import {createBrowserRouter} from "react-router";
import AuthLayout from "../layout/AuthLayout.tsx";
import Login from "../pages/AuthPages/SignIn.tsx"
import ProtectedRoute from "./ProtectedRoute.tsx";
import AppLayout from "../layout/AppLayout.tsx";
import Home from "../pages/Dashboard/Home.tsx";
import Blank from "../pages/Blank.tsx";
import BasicTables from "../pages/Tables/BasicTables.tsx";

import NotFound from "../pages/OtherPage/NotFound.tsx";

export const router = createBrowserRouter([
    {
        element:<AuthLayout/>,
        children: [
            {path: '/login', element: <Login/>}
        ],
    },
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <AppLayout/>,
                children: [
                    {
                        path: '/',
                        element: <Home/>
                    },
                    // {
                    //     path: '/profile',
                    //     element: <UserProfiles />
                    // },
                    // {
                    //     path: '/calendar',
                    //     element: <Calendar />
                    // },
                    {
                        path: '/blank',
                        element: <Blank />
                    },
                    // {
                    //     path: '/form-elements',
                    //     element: <FormElements />
                    // },
                    {
                        path: '/tables',
                        element: <BasicTables />
                    },
                    // {
                    //     path: '/alerts',
                    //     element: <Alerts />
                    // },
                    // {
                    //     path: '/avatars',
                    //     element: <Avatars />
                    // },
                    // {
                    //     path: '/badge',
                    //     element: <Badges />
                    // },
                    // {
                    //     path: '/buttons',
                    //     element: <Buttons />
                    // },
                ]
            }
        ]
    },
    {
        path:"*",
        element: <NotFound/>
    }
])