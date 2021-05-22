
import React, {useEffect, useState} from "react";
import Head from "next/head";

import Card from "../components/card"
import CardLoader from "../components/card-loader"
import {projects} from "../data/projects/list"

const Projects = () => {
  const [localProjects, setLocalProjects] = useState([])

  useEffect(() =>{
    setTimeout(() => {
      setLocalProjects(projects)
    }, 1500)
  }, [])

  return (
    <div>
        <Head>
        <title>Projects | Okumu Justine</title>
      </Head>
      <h2 className="text-2xl text-gray-800 font-bold pb-4">My Projects and Contributions.</h2>
      <>{localProjects.length === 0 && <div className="flex justify-center items-center lg:mt-40"><CardLoader/></div>}</>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"> 
     {localProjects.length > 0 && projects.map((project, index) => {
     return <Card key={index} projectTitle={project.projectTitle} link={project.link} videoLink={project.videoLink} description={project.description} myTitle={project.myTitle}  />
      }) }
       </div>
    </div>
  );
};

export default Projects;
