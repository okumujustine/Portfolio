
import React from "react";
import Head from "next/head";

import Card from "../components/card"

const Projects = () => {
  const projects = [
    {link: "https://jobsug.netlify.app/", projectTitle:"JOB PORTAL",  myTitle:"Developer/Creator", videoLink:"https://www.youtube.com/watch?v=Q-U3voOZukg" ,description: "A job application website for managing job applications by both employees and employers."},
    {link: "https://www.mumble.dev/", projectTitle:"MUMBLE", myTitle:"Opensource contributor", videoLink:"https://www.youtube.com/watch?v=2c8SIX0VsSc&t=474s" ,description: "Mumble is an opensource social media platform and public forum for questions and discussions."}
  ]
  return (
    <div>
        <Head>
        <title>Projects | Okumu Justine</title>
      </Head>
      <h2 className="text-2xl text-gray-800 font-bold">My Projects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"> 
     {projects.length > 0 && projects.map((project, index) => {
     return <Card key={index} projectTitle={project.projectTitle} link={project.link} videoLink={project.videoLink} description={project.description} myTitle={project.myTitle}  />
    }) }
       </div>
    </div>
  );
};

export default Projects;
