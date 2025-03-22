import React, { useState } from 'react'
import {
  FiUpload,
  FiStar,
  FiBook,
  FiTag,
  FiImage,
  FiPlus
} from 'react-icons/fi'

const CreateGame = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: '',
    images: [],
    genre: '',
    background_image: null
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false)

  const genres = [
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Simulation',
    'Sports',
    'Puzzle',
    'Racing',
    'Horror',
    'Platformer'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target

    if (name === 'background_image' && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0]
      })

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(files[0])
    } else if (name === 'images') {
      const imageArray = Array.from(files)
      setFormData({
        ...formData,
        [name]: imageArray
      })

      // Create previews
      const newPreviews = []
      imageArray.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          newPreviews.push(e.target.result)
          if (newPreviews.length === imageArray.length) {
            setGalleryPreviews(newPreviews)
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData) // Handle form submission logic
    setFormSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        name: '',
        description: '',
        rating: '',
        images: [],
        genre: '',
        background_image: null
      })
      setImagePreview(null)
      setGalleryPreviews([])
    }, 3000)
  }

  return (
    <div className='min-h-screen bg-gray-900 pt-20 pb-12 px-4 w-full'>
      <div className='max-w-3xl mx-auto'>
        {/* Header with gaming style */}
        <div className='relative mb-8 text-center'>
          <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 inline-block'>
            ADD NEW GAME
          </h1>
          <div className='h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-400 mx-auto mt-2'></div>
          <div className='absolute -top-4 right-1/4 w-16 h-16 bg-purple-600 opacity-10 rounded-full blur-xl'></div>
          <div className='absolute -bottom-4 left-1/3 w-12 h-12 bg-blue-600 opacity-10 rounded-full blur-xl'></div>
        </div>

        {formSubmitted ? (
          <div className='bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 text-center relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20'></div>
            <div className='relative z-10'>
              <div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-green-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  ></path>
                </svg>
              </div>
              <h2 className='text-2xl font-bold text-white mb-2'>
                Game Added Successfully!
              </h2>
              <p className='text-gray-300 mb-4'>
                Your game has been submitted to the collection.
              </p>
              <div className='w-full h-1.5 bg-gray-700 rounded-full mt-6'>
                <div
                  className='h-1.5 rounded-full bg-gradient-to-r from-green-400 to-blue-500 animate-pulse'
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden'
          >
            <div className='absolute -top-12 -right-12 w-24 h-24 bg-purple-500 opacity-10 rounded-full blur-xl'></div>
            <div className='absolute -bottom-12 -left-12 w-24 h-24 bg-blue-500 opacity-10 rounded-full blur-xl'></div>

            <div className='space-y-6 relative z-10'>
              {/* Game Cover Image Upload */}
              <div className='mb-6'>
                <label className='block text-gray-300 text-sm font-medium mb-2 flex items-center'>
                  <FiImage className='mr-2' /> Cover Image
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 transition-all ${
                    imagePreview
                      ? 'border-green-500/50'
                      : 'border-gray-600 hover:border-purple-500/50'
                  }`}
                >
                  {imagePreview ? (
                    <div className='relative'>
                      <img
                        src={imagePreview}
                        alt='Preview'
                        className='w-full h-48 object-cover rounded-lg'
                      />
                      <button
                        type='button'
                        onClick={() => {
                          setImagePreview(null)
                          setFormData({ ...formData, background_image: null })
                        }}
                        className='absolute top-2 right-2 bg-red-500/70 hover:bg-red-500 p-1 rounded-full text-white'
                      >
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M6 18L18 6M6 6l12 12'
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className='text-center py-8'>
                      <FiUpload className='mx-auto h-10 w-10 text-gray-400' />
                      <div className='mt-2'>
                        <label
                          htmlFor='background_image'
                          className='relative cursor-pointer rounded-md font-medium text-purple-400 hover:text-purple-300'
                        >
                          <span>Upload a file</span>
                          <input
                            id='background_image'
                            name='background_image'
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                            className='sr-only'
                            required
                          />
                        </label>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Game Basic Info */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-gray-300 text-sm font-medium mb-2 flex items-center'
                  >
                    <FiPlus className='mr-2' /> Game Title
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Enter game name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='genre'
                    className='block text-gray-300 text-sm font-medium mb-2 flex items-center'
                  >
                    <FiTag className='mr-2' /> Genre
                  </label>
                  <select
                    id='genre'
                    name='genre'
                    value={formData.genre}
                    onChange={handleChange}
                    className='w-full py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                    required
                  >
                    <option value='' disabled>
                      Select genre
                    </option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Game Description */}
              <div>
                <label
                  htmlFor='description'
                  className='block text-gray-300 text-sm font-medium mb-2 flex items-center'
                >
                  <FiBook className='mr-2' /> Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  rows='4'
                  placeholder='Write a compelling description of the game'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                  required
                ></textarea>
              </div>

              {/* Rating */}
              <div>
                <label
                  htmlFor='rating'
                  className='block text-gray-300 text-sm font-medium mb-2 flex items-center'
                >
                  <FiStar className='mr-2' /> Rating (1-10)
                </label>
                <div className='relative'>
                  <input
                    type='range'
                    id='rating'
                    name='rating'
                    min='1'
                    max='10'
                    step='0.1'
                    value={formData.rating || 5}
                    onChange={handleChange}
                    className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <div className='flex justify-between text-xs text-gray-400 px-2 mt-1'>
                    <span>1</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>5</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>10</span>
                  </div>
                  <div className='text-center mt-2 text-white font-bold'>
                    {formData.rating || 5}
                  </div>
                </div>
              </div>

              {/* Game Screenshots */}
              <div>
                <label className='block text-gray-300 text-sm font-medium mb-2 flex items-center'>
                  <FiImage className='mr-2' /> Game Screenshots
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 transition-all ${
                    galleryPreviews.length > 0
                      ? 'border-green-500/50'
                      : 'border-gray-600 hover:border-purple-500/50'
                  }`}
                >
                  {galleryPreviews.length > 0 ? (
                    <div>
                      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                        {galleryPreviews.map((preview, index) => (
                          <div key={index} className='relative'>
                            <img
                              src={preview}
                              alt={`Gallery ${index}`}
                              className='w-full h-24 object-cover rounded-lg'
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type='button'
                        onClick={() => {
                          setGalleryPreviews([])
                          setFormData({ ...formData, images: [] })
                        }}
                        className='mt-4 text-sm text-red-400 hover:text-red-300 flex items-center'
                      >
                        <svg
                          className='w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          ></path>
                        </svg>
                        Clear all images
                      </button>
                    </div>
                  ) : (
                    <div className='text-center py-6'>
                      <FiUpload className='mx-auto h-8 w-8 text-gray-400' />
                      <div className='mt-2'>
                        <label
                          htmlFor='images'
                          className='relative cursor-pointer rounded-md font-medium text-purple-400 hover:text-purple-300'
                        >
                          <span>Upload screenshots</span>
                          <input
                            id='images'
                            name='images'
                            type='file'
                            accept='image/*'
                            multiple
                            onChange={handleFileChange}
                            className='sr-only'
                            required
                          />
                        </label>
                        <p className='text-xs text-gray-500'>
                          Upload multiple screenshots (max 6)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className='mt-8'>
                <button
                  type='submit'
                  className='w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800 transition-all duration-300'
                >
                  <div className='flex items-center justify-center'>
                    <span>Add Game</span>
                    <svg
                      className='ml-2 w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 7l5 5m0 0l-5 5m5-5H6'
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CreateGame
