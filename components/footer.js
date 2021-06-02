import React from 'react'

export default function Footer() {
    return (
        <div className=" h-14 lg:h-16 bg-gray-900 mt-6 lg:mt-8 flex justify-center items-center">
            <span className="text-white font-bold">Okumu Justine {`@ ${new Date().getFullYear()}`}</span>
        </div>
    )
}
