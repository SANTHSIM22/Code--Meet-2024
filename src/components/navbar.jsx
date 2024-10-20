import React from 'react'

const navbar = () => {
  return (
    <div className="flex  w-screen bg-orange-500 h-20 justify-between items-center mb-5">
        <div className="flex items-center pl-2 text-2xl">
            LOGO
        </div>
        <div>
        <ul className="pr-2 flex ">
                    <li className="mr-4 hover:text-sky-500"><a href="#" className="underline  hover:decoration-sky-500">Login</a></li>
                    <li className="mr-4 hover:text-sky-500"><a href="#" className="underline   hover:decoration-sky-500">Dashboard</a></li>
                    <li className="mr-4 hover:text-sky-500"><a href="#" className="underline   hover:decoration-sky-500">Admin</a></li>
                    <li className=" hover:text-sky-500"><a href="#" className="underline   hover:decoration-sky-500">Logout</a></li>
                </ul>
                
        </div>
            
        </div>
         
  )
}

export default navbar