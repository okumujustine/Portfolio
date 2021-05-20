import React from 'react'
import Navbar from "../components/navbar"

export default function Main({children}) {
    return (
        <div>
            <Navbar />
            <div className="mx-5 lg:w-9/12 lg:m-auto lg:pt-28 pt-24">{children}</div>
        </div>
    )
}
