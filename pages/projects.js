
import React, { useEffect, useState } from "react";
import Head from "next/head";

import Card from "../components/card"
import CardLoader from "../components/card-loader"
import { projects } from "../data/projects/list"

const Projects = () => {
  const [localProjects, setLocalProjects] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setLocalProjects(projects)
    }, 1500)
  }, [])

  return (
    <div>
      <Head>
        <title>Projects | Okumu Justine | Ugandan Software Developer</title>
        <meta name="description" content="Okumu Justine Ugandan Developer Software portfolio website" />
        <meta name="description" content="Okumu Justine Ugandan Developer Software portfolio website" />
        <meta property="og:title" content="Projects | Okumu Justine | Ugandan Software Developer" />
        <meta property="og:description" content="Okumu Justine Ugandan Developer Software portfolio website" />
        <meta property="og:url" content="https://okumujustine.com/projects" />
        <meta property="og:site_name" content="Okumu Justine: Okumu Justine Ugandan Developer Software portfolio website" />
      </Head>
      <h2 className="text-2xl text-gray-800 font-bold pb-4">My Projects and Contributions.</h2>
      <>{localProjects.length === 0 && <div className="flex justify-center items-center lg:mt-40"><CardLoader /></div>}</>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {localProjects.length > 0 && projects.map((project, index) => {
          return <Card key={index} {...project} />
        })}
      </div>
    </div>
  );
};

export default Projects;
