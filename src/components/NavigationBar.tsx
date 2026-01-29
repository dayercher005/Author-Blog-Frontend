"use client"

import {
  Button
} from "@/components/ui/button";
import { Link } from 'react-router';


export function NavigationBar() {
  return (
    <div className="flex justify-between items-center px-7 py-3">
        <h1 className="text-xl font-bold">Blog</h1>

        <div>
            <Link to="/log-in">
                <Button size="lg" className="bg-neutral-700 m-1.5 p-3 text-md hover:bg-neutral-800 transition">
                    Log In
                </Button>
            </Link>
            <Link to="/sign-up">
                <Button size="lg" className="m-1.5 p-3 text-md hover:bg-gray-200 transition" variant="outline">
                    Sign Up
                </Button>
            </Link>
        </div>
    </div>
  )
}