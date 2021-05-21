import React from 'react'
import Navbar from "../components/navbar"
import Footer from "../components/footer"

export default function Main({children}) {
    return (
        <div>
            <Navbar />
            <div className="mx-5 lg:w-9/12 lg:m-auto lg:pt-28 pt-24 min-h-screen">{children}</div>
            <Footer/>
        </div>
    )
}
