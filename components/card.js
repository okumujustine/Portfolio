import React from 'react'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons'

export default function Card({link, videoLink, description, projectTitle, myTitle}) {
    return (
        <div className="shadow-sm border-2 border-gray-100 py-6 px-3 flex flex-col mt-4">
        <div>
        <ReactPlayer controls={true} width="100%" height="200px" url={videoLink} />
        </div>
        <hr />
        <div class="leading-relaxed">
            <div className="flex justify-between"> 
            <h2 className="font-bold pt-3">
            <a 
            className="hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer" href={link}>
                {projectTitle}
            </a>
            </h2>
            <span className="pt-3 flex justify-center">
            <a 
            className="hover:text-blue-500 text-blue-800 font-bold"
            target="_blank"
            rel="noopener noreferrer" href={link}>
                Link <FontAwesomeIcon className="app-link" icon={faLink} />
            </a>
            </span>
            </div>
            <small className="underline text-green-700">{myTitle}</small>
        </div>
        <div className="texl-lg leading-relaxed text-gray-600 py-3">
          {description}
        </div>
      </div>
    )
}
