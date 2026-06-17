import { createBrowserRouter } from 'react-router-dom'

import A0301 from '../A0301.jsx'
import A0303 from '../A0303.jsx'
import A0004 from '../A0004.jsx'
import A0004_1 from '../A0004_1.jsx'
import A0303verify from '../A0303verify.jsx'
import A0303modify from '../A0303modify.jsx'
import { Navigate } from 'react-router-dom'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/A0301" />,
    },
    {
        path: '/A0301',
        element: <A0301 />,
    },
    {
        path: '/A0303/:id',
        element: <A0303 />,
    },
    {
        path: '/A0004',
        element: <A0004 />,
    },
    {
        path: '/A0004_1',
        element: <A0004_1 />,
    },
    {
        path: '/A0303verify/:id',
        element: <A0303verify />,
    },
    {
        path: '/A0303modify/:id',
        element: <A0303modify />,
    },
    // {
    //     path: '*',
    //     element: <Blank404/>,
    // }
])