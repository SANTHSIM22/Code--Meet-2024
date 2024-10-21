import React from 'react'

const navbar = () => {
  return (
    
<div
  class="flex flex-col justify-center items-center relative transition-all duration-[450ms] ease-in-out w-16 m-2"
>
  <article
    class="border border-solid border-gray-700 w-full ease-in-out duration-500 left-0 rounded-2xl inline-block shadow-lg shadow-black/15 bg-white"
  >
    <label
      for="messages"
      class="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
    >
      <input
        class="hidden peer/expand"
        type="radio"
        name="path"
        id="messages"
      />
      <div class="absolute opacity-0 -left-full rounded-md py-2 px-2 bg-black bg-opacity-30  -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
    Home
  </div>
  <a href="/">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
</a>
    
    </label>
    <label
      for="profile"
      class="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
    >
      <input class="hidden peer/expand" type="radio" name="path" id="profile" />
      <div class="absolute opacity-0 -left-full rounded-md py-2 px-2 bg-black bg-opacity-30  -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
    Profile
  </div>
      <svg
        class="peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
  <a href="/admin" >
        <path
          d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
        ></path>
        </a>
      </svg>
    </label>
    
    <label
      for="dashboard"
      class="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
      >
        <a href="/dashboard" >
        
      <input
        class="hidden peer/expand"
        type="radio"
        name="path"
        id="dashboard"
      />
      
      <div class="absolute opacity-0 -left-full rounded-md py-2 px-2 bg-black bg-opacity-30  -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
    Dashboard
  </div>

      <svg
        class="peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        >
        <path
          d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"
          ></path>
        
      </svg>
          </a>
    </label>
    <label
      for="help"
      class="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
    >
      <input class="hidden peer/expand" type="radio" name="path" id="help" />
      <div class="absolute opacity-0 -left-full rounded-md py-2 px-2 bg-black bg-opacity-30  -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
    Alerts
  </div>
      <svg
        class="peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <a href="#Alerts" >
        <path
          d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"
        ></path>
        <path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path>
        </a>
      </svg>
    </label>
    
  </article>
</div>

         
  )
}

export default navbar