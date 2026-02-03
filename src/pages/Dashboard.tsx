import { useState, useEffect } from 'react';

export function DashboardPage(){

    useEffect(() => {

        const API = "http://localhost:8080/author/dashboard";
        const token = localStorage.getItem("token");

        const AuthenticateAuthor = async() => {
            const response = await fetch(API, {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok){
                console.log(response);
            }
            const data = await response.json();
            
        }

        AuthenticateAuthor();
    }, [])

    return(
        <div>
            
        </div>
    )
}