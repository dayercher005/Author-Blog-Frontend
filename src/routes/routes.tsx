import { createBrowserRouter } from 'react-router';
import { HomePage } from '../pages/HomePage.tsx';
import { LoginPage } from '../pages/LoginPage.tsx';
import { SignupPage } from '../pages/SignupPage.tsx';
import { DashboardPage } from '../pages/Dashboard.tsx';
import { CreateBlogPage } from '../pages/CreateBlogPage.tsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/log-in",
        element: <LoginPage />,
    },
    {
        path: "/sign-up",
        element: <SignupPage />,
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
    },
    {
        path: "/create-blog",
        element: <CreateBlogPage />
    }
    
])