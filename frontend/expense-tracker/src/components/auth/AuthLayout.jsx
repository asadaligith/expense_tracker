import React from 'react';
import {LuTrendingUpDown} from 'react-icons/lu';
import card from '../../assets/images/card.jpeg'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
         <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 '>
          <h2 className='text-lg font-medium text-black '>Expense Tracker </h2>
           {children}
        </div>

         <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
            <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute top-7 left-8 -z-10'/>
            <div className='w-48 h-56 border[20px] border-fuchsia-600 absolute top-[30%] -right-0.5'/>
            <div className='w-48 h-48 rounded-[40px] bg-violet-600 absolute -bottom-7'/>

            <div className='grid grid-cols-1 z-20'>
                <StatsInfoCard
                icon = {<LuTrendingUpDown/>}
                label = "Track Your Expenses"
                value = "430,000"
                color = "bg-primary"/>

            </div>

            <img src={card} 
             className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15' alt="" />
        </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({icon,label,value,color}) => {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg shadow-md shadow-blue-400/10 mb-6 bg-white`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}>
        {icon}
      </div>
      <div className='flex flex-col'>
        <span className='text-sm text-gray-500'>{label}</span>
        <span className='text-lg font-semibold'>{value}</span>
      </div>
    </div>
  )
}