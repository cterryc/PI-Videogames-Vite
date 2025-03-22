import React from 'react'
import { useState, useEffect } from 'react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const skills = [
    { name: 'Frontend', level: 85 },
    { name: 'Backend', level: 80 },
    { name: 'CSS Frameworks', level: 90 },
    { name: 'Git', level: 75 },
    { name: 'Algoritmos', level: 70 },
    { name: 'Edición de Video', level: 65 }
  ]

  // Typewriter effect for the title
  const [displayText, setDisplayText] = useState('')
  const fullText = 'ABOUT ME'

  useEffect(() => {
    setIsVisible(true)

    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 150)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className='w-full min-h-screen bg-gray-900 text-white pt-20 pb-12 px-4 bg-opacity-80'>
      <div className='max-w-4xl mx-auto'>
        {/* Header with gaming style */}
        <div className='relative border-b-2 border-purple-500 pb-4 mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400'>
            {displayText}
            <span className='animate-pulse'>_</span>
          </h1>
          <div className='absolute top-0 right-0 w-20 h-20 bg-purple-600 opacity-20 rounded-full blur-xl'></div>
          <div className='absolute bottom-0 left-1/4 w-16 h-16 bg-blue-600 opacity-20 rounded-full blur-xl'></div>
        </div>

        {/* Character Card */}
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className='bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8 relative overflow-hidden shadow-lg'>
            {/* Decorative elements */}
            <div className='absolute -top-12 -right-12 w-24 h-24 bg-purple-500 opacity-20 rounded-full blur-md'></div>
            <div className='absolute -bottom-8 -left-8 w-16 h-16 bg-blue-500 opacity-20 rounded-full blur-md'></div>

            <h2 className='text-2xl font-bold mb-4 flex items-center'>
              <span className='inline-block w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse'></span>
              Daniel Martel
              <span className='text-sm text-gray-400 ml-2 font-normal'>
                Lvl. 27 Developer
              </span>
            </h2>

            <p className='text-gray-300 mb-6 leading-relaxed'>
              Soy Full Stack Developer, con conocimientos en metodologías
              ágiles, GIT, estructura de datos, algoritmos, frameworks CSS.
              Profesional versátil con experiencia en edición de videos y fotos,
              gestión básica de redes sociales y experiencia en comercio de
              equipos electrónicos. Dedicado, orientado al cliente y habilidad
              en pensamiento analítico. Nivel de inglés básico.
            </p>

            <h3 className='text-xl font-bold mb-4 border-l-4 border-purple-500 pl-3'>
              Habilidades
            </h3>

            <div className='flex flex-wrap gap-2 mb-6'>
              <span className='bg-purple-900/50 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-800'>
                Full Stack
              </span>
              <span className='bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-800'>
                Frontend
              </span>
              <span className='bg-indigo-900/50 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-800'>
                Backend
              </span>
              <span className='bg-cyan-900/50 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-800'>
                Next
              </span>
              <span className='bg-green-900/50 text-green-300 text-xs px-3 py-1 rounded-full border border-green-800'>
                Express
              </span>
              <span className='bg-purple-900/50 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-800'>
                Git
              </span>
              <span className='bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-800'>
                Git Hub
              </span>
              <span className='bg-indigo-900/50 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-800'>
                CSS Frameworks
              </span>
              <span className='bg-cyan-900/50 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-800'>
                PostgreSQL
              </span>
              <span className='bg-green-900/50 text-green-300 text-xs px-3 py-1 rounded-full border border-green-800'>
                Tailwind
              </span>
              <span className='bg-purple-900/50 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-800'>
                React
              </span>
              <span className='bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-800'>
                NestJS
              </span>
              <span className='bg-indigo-900/50 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-800'>
                Sequelize
              </span>
              <span className='bg-cyan-900/50 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-800'>
                Redux
              </span>
              <span className='bg-green-900/50 text-green-300 text-xs px-3 py-1 rounded-full border border-green-800'>
                Otros
              </span>
            </div>
          </div>
        </div>

        {/* Quest/Mission */}
        <div
          className={`transition-all duration-1000 transform delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className='bg-gray-800/80 border border-gray-700 rounded-lg p-6 relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-900/10 to-blue-900/10'></div>

            <h3 className='text-xl font-bold mb-4 flex items-center'>
              <svg
                className='w-5 h-5 mr-2 text-yellow-500'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z'></path>
              </svg>
              Misión Actual
            </h3>

            <p className='text-gray-300 leading-relaxed'>
              Mi objetivo es desarrollar mi carrera en la programación, trabajar
              en una empresa de tecnología líder y contribuir al desarrollo de
              proyectos innovadores. Para lograrlo, estoy trabajando en
              proyectos personales para mejorar mis habilidades. Estoy
              emocionado de ver lo que el futuro me depara y estoy listo para
              enfrentar cualquier obstáculo en mi camino.
            </p>

            <div className='mt-6 flex justify-end'>
              <button className='px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-sm font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300'>
                Contáctame
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
