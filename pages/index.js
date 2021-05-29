import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Crubs from "../components/crubs"

export default function Index() {
  return (
    <div>
      <Head>
        <title>Home | Okumu Justine</title>
      </Head>
      <section className="flex flex-col lg:flex-row justify-between items-center lg:px-4 h-1/2 pb-10 lg:pb-16">
        <div className="flex flex-col lg:justify-between space-y-6 py-4 w-10/12 lg:w-6/12 ">
          <div>
            <p className="text-lg">Hello, I am 👋</p>
            <h1 className=" text-3xl lg:text-5xl font-bold text-gray-800">Okumu Justine</h1>
          </div>
          <div>
            <p className="texl-lg leading-relaxed">
              A software developer building apps to make life easier and
            <br /> contributing to open source. I have experience in Python,
            <br /> JavaScript, TypeScript and learning ethereum (solidity).
            <br /> Let me help you  grow your business to the moon 🚀.
            </p>

          </div>
          <div className="inline-flex space-x-4">
            <a
              target="_blank"
              rel="noopener noreferrer" href="https://github.com/okumujustine">
              <FontAwesomeIcon className="social-link" icon={faGithub} />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer" href="https://www.linkedin.com/in/okumu-justine-b4993b13b/">
              <FontAwesomeIcon className="social-link" icon={faLinkedin} />
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer" href="https://www.facebook.com/okumu.justine.9/">
              <FontAwesomeIcon className="social-link" icon={faFacebook} />
            </a>

          </div>
        </div>
        <div className="pt-5 lg:pt-0">
          <div className="rounded-full border-4 border-gray-200 h-52 lg:h-60 w-52 lg:w-60 bg-cover" style={{ backgroundImage: "url('dist/images/zila.jpeg')" }}></div>
        </div>
      </section>
      <div className="flex justify-center mb-20">
        <a href="mailto:okumujustine01@gmail.com" className="bg-blue-700 text-white py-3 px-4 hover:bg-blue-900 font-bold shadow-lg rounded-md flex justify-between items-center uppercase">Work with me<span className="ml-3 animate-ping bg-white h-3 w-3 rounded-full"></span></a>
      </div>
      <section className="bg-gray-50 py-16 px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800">Technologies</h1>
            <p className="py-4">Here's is my tech stacks</p>
          </div>
          <div className="flex lg:flex-row flex-wrap flex-row justify-center">
            <Crubs text="Python" />
            <Crubs text="TypeScript" />
            <Crubs text="Django" />
            <Crubs text="ReactJS" />
            <Crubs text="React Native" />
            <Crubs text="MongoDB" />
            <Crubs text="Firebase" />
            <Crubs text="Postgres" />
            <Crubs text="Redux" />
            <Crubs text="Ethereum" />
            <Crubs text="Solidity" />
          </div>
          <div className="flex justify-center mt-10">
            <a href="mailto:okumujustine01@gmail.com" className="bg-green-700 text-white py-3 px-4 hover:bg-green-900 font-bold shadow-lg rounded-md flex justify-between items-center uppercase">Work with me<span className="ml-3 animate-ping bg-white h-3 w-3 rounded-full"></span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
