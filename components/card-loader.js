import React from 'react'

export default function CardLoader() {
        let circleCommonClasses = 'h-3 w-3 bg-current rounded-full bg-blue-500';

        return (
            <div className='flex'>
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-1 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
        );
}
