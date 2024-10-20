import React from "react";

const Login_admin = () => {
  return (
  
      <div className="flex justify-center items-center  h-screen m-auto rounded-lg bg-gray-800 ">
        <div className="flex-col rounded-lg p-8 bg-gray-800 ">
        
        <p className="text-center text-gray-300 text-xl font-bold">Login</p>      
        <form className="mt-6">
          <div className="mt-1 text-sm">
            <label htmlFor="username" className="block text-gray-400">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              className="w-64 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 m-2 text-gray-200 focus:border-indigo-400 focus:outline-none"
            />
          </div>
          <div className="mt-4 text-sm">
            <label htmlFor="password" className="block text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              className="w-64 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 m-2 text-gray-200 focus:border-indigo-400 focus:outline-none"
            />
            <div className="flex justify-center mt-2 text-xs text-gray-400">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-64 rounded-md bg-indigo-500 py-2 text-gray-900 font-semibold hover:bg-indigo-600"
          >
            Sign in
          </button>
        </form>
        
        <p className="mt-4 text-center text-xs text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-gray-200 hover:underline">
            Sign up
          </a>
        </p>
        </div>
      </div>
 
  );
};

export default Login_admin;
