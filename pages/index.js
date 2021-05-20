import Head from "next/head";
import { LogoFacebook, LogoLinkedin, LogoGithub, LogoNodejs } from 'react-ionicons'

import Main from "./main"

export default function Index() {
  return (
    <div>
      <Head>
        <title>Home | Okumu Justine</title>
      </Head>
      <section className="flex flex-col lg:flex-row justify-between items-center lg:px-4 h-1/2 pb-10 lg:pb-28">
        <div className="flex flex-col lg:justify-between space-y-6 py-4 w-10/12 lg:w-6/12 ">
          <div>
          <p className="text-lg">Hello, I am 👋</p>
          <h1 className=" text-3xl lg:text-5xl font-bold text-gray-800">Okumu Justine</h1>
          </div>
          <div>
            <p className="texl-lg leading-relaxed">
            A software developer building apps to make life easier and 
            <br/> contributing to open source. I have experience in Python,
            <br/> JavaScript, TypeScript and learning ethereum (solidity).
            <br/> Let me help you  grow your business to the moon 🚀.
            </p>

          </div>
          <div className="inline-flex space-x-4">

          <LogoFacebook
              color={'#00000'}
              cssClasses="cursor-pointer"
              height="25px"
              width="25px"
              onClick={() => alert('Hi!')}
          />
          <LogoLinkedin
              color={'#00000'}
              cssClasses="cursor-pointer"
              height="25px"
              width="25px"
              onClick={() => alert('Hi!')}
          />
          <LogoGithub
              color={'#00000'}
              cssClasses="cursor-pointer"
              height="25px"
              width="25px"
              onClick={() => alert('Hi!')}
          />
    
        </div>
        </div>
        <div className="pt-5 lg:pt-0">
          <div className="rounded-full border-4 border-gray-200 h-52 lg:h-60 w-52 lg:w-60 bg-cover" style={{backgroundImage:"url('dist/images/zila.jpeg')"}}></div>
        </div>
      </section>
      <section className="bg-gray-50 pt-20 pb-28 px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-800">Services</h1>
                    <p className="pt-2">Here's what I offer</p>
                </div>
                <div
                    className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20"
                >
                    <div className="relative">
                        <div
                            className="absolute z-10 inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"
                        ></div>

                        <div
                            className="relative z-20 bg-white h-full rounded-md shadow-md px-10 py-12"
                        >
                            <ion-icon
                                name="phone-portrait-outline"
                                className="text-5xl text-cyan-500"
                            ></ion-icon>
                            <h2 className="pt-3 font-bold text-2xl">
                                Responsive Websites
                            </h2>
                            <p className="pt-3">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Consequuntur aperiam quibusdam
                                repudiandae et necessitatibus culpa libero
                                mollitia.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="absolute z-10 inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"
                        ></div>

                        <div
                            className="relative z-20 bg-white h-full rounded-md shadow-md px-10 py-12"
                        >
                            <ion-icon
                                name="layers-outline"
                                className="text-5xl text-cyan-500"
                            ></ion-icon>
                            <h2 className="pt-3 font-bold text-2xl">Web Apps</h2>
                            <p className="pt-3">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Consequuntur aperiam quibusdam
                                repudiandae et necessitatibus culpa libero
                                mollitia.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="absolute z-10 inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"
                        ></div>

                        <div
                            className="relative z-20 bg-white h-full rounded-md shadow-md px-10 py-12"
                        >
                            <ion-icon
                                name="chatbubbles-outline"
                                className="text-5xl text-cyan-500"
                            ></ion-icon>
                            <h2 className="pt-3 font-bold text-2xl">
                                Consultation
                            </h2>
                            <p className="pt-3">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Consequuntur aperiam quibusdam
                                repudiandae et necessitatibus culpa libero
                                mollitia.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
