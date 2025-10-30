import React, { useState, useRef } from 'react'
import { LuUser, LuUpload, LuTrash2 } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  // --- choose file ---
  const onChooseFile = () => {
    inputRef.current.click()
  }

  // --- when file changes ---
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

  // --- remove image ---
  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
  }

  return (
    <div className='flex justify-center mb-6'>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {!image ? (
        <div className='w-20 h-20 items-center justify-center bg-purple-100 rounded-full relative flex flex-col'>
          <LuUser className='text-4xl text-primary' />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 right-2'
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img
            src={previewUrl}
            alt='profilephoto'
            className='w-20 h-20 rounded-full object-cover'
          />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 right-2'
            onClick={handleRemoveImage}
          >
            <LuTrash2 />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector