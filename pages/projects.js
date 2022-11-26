
import React, { useEffect, useState } from "react";
import Head from "next/head";
import ClassNames from "classnames"

import Card from "../components/card"
import CardLoader from "../components/card-loader"
import { projects, cprojects } from "../data/projects/list"

const Projects = () => {
  const projType = {
    clients: "clients",
    personal: "personal",
  }
  const [localProjects, setLocalProjects] = useState([])
  const [clientsProjects, setClientsProjects] = useState([])

  const [projectType, setProjectType] = useState(projType.clients)

  useEffect(() => {
    setTimeout(() => {
      setLocalProjects(projects)
    }, 1500)

    setTimeout(() => {
      setClientsProjects(cprojects)
    }, 1500)

  }, [])

  const onClients = () => setProjectType(projType.clients)
  const onPersonal = () => setProjectType(projType.personal)

  return (
    <div>
      <Head>
        <title>Projects | Okumu Justine | Software Developer</title>
        <meta name="description" content="Projects | Okumu Justine | Software Developer" />
        <meta property="og:title" content="Projects | Okumu Justine | Software Developer" />
        <meta property="og:description" content="Projects | Okumu Justine | Software Developer" />
        <meta property="og:url" content="https://okumujustine.com/projects" />
        <meta property="og:site_name" content="Okumu Justine: Software Developer" />
      </Head>
      <div className="mb-3">
      <button class={ClassNames("border-2 border-blue-500 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-md mx-2", { "bg-blue-700 text-white": projectType === projType.clients })} onClick={onClients}>Clients</button>
        <button class={ClassNames("border-2 border-blue-500  hover:bg-blue-400 hover:text-white px-4 py-2 rounded-md mx-2", { "bg-blue-700 text-white": projectType === projType.personal })} onClick={onPersonal}>Personal</button>
      </div>
      {projectType === projType.clients ? <div>
        <h2 className="text-2xl text-gray-800 font-bold pb-4">Client's.</h2>
        <>{clientsProjects.length === 0 && <div className="flex justify-center items-center lg:mt-40"><CardLoader /></div>}</>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {clientsProjects.length > 0 && cprojects.map((project, index) => {
            return <Card key={index} {...project} />
          })}
        </div>
      </div> : null}
      {projectType === projType.personal ? <div>
        <h2 className="text-2xl text-gray-800 font-bold pb-4">Personal.</h2>
        <>{localProjects.length === 0 && <div className="flex justify-center items-center lg:mt-40"><CardLoader /></div>}</>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {localProjects.length > 0 && projects.map((project, index) => {
            return <Card key={index} {...project} />
          })}
        </div>
      </div> : null}
    </div>
  );
};

export default Projects;
