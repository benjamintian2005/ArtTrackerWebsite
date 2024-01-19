"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"


export default function SignOut(){
    return <button onClick={() => signOut()}>Sign out</button>
}


