import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";

import CardLoader from "../components/card-loader"

export default function Blogs() {

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)

    axios.get('https://dev.to/api/articles?per_page=30&page=1&username=okumujustine').then(res => {
      setLoading(false)
      setBlogs(res?.data)
    }).catch(() => {
      setLoading(false)
      setError("Sorry, we couldn't fetch blogs right now, try again later!")
    })

  }, [])

  return (
    <div>
      <Head>
        <title>Blog | Okumu Justine | Ugandan Software Developer</title>
        <meta name="description" content="Okumu Justine Ugandan Developer Software portfolio website" />
        <meta property="og:title" content="Blog | Okumu Justine | Ugandan Software Developer" />
        <meta property="og:description" content="Okumu Justine Ugandan Developer Software portfolio website" />
        <meta property="og:url" content="https://okumujustine.com/blogs" />
        <meta property="og:site_name" content="Okumu Justine: Okumu Justine Ugandan Developer Software portfolio website" />
      </Head>
      <p className="text-2xl text-gray-800 font-bold pb-4">My blogs</p>
      <>{loading && <div className="flex justify-center items-center lg:mt-40"><CardLoader /></div>}</>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {!loading && blogs.map(blog => {
          return <div key={blog.id} className="border-2 border-blue-100 rounded-md py-4 px-4 leading-relaxed">
            <div className="flex flex-col font-bold pt-3 pb-2 text-green-700">
              <a target="_blank" rel="noopener noreferrer" href={blog.url} className="text-2xl text-blue-800 hover:underline font-semibold">{blog.title}</a>
              <small className="underline">okumujustine</small>
            </div>
            <p className="pt-2">{blog.description}</p>
            <div className="mt-2 flex flex-row">
              {blog.tag_list.map((tag, index) => <div key={index}>
                <small className="bg-gray-100 border-2 border-gray-200 px-2 py-1 rounded-full mr-2">{tag}</small>
              </div>)}
            </div>
          </div>
        })}
      </div>
    </div>
  );
};
