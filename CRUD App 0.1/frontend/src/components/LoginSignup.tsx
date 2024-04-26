import { useState } from "react";

function LoginSignup() {
  const [login, setlogin] = useState("login");

  return (
    <>
      <div className="flex justify-center">
        <div className="header">
          <div className=" text-slate-50 ">Login</div>
          <br />
          <div className="underline"></div>
          <div className="inputs">
            <div className="input rounded-md">
              <input
                type="text"
                placeholder="username"
                className="rounded-md flex justify-center"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="email"
                className="rounded-md flex justify-center"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="password"
                className="rounded-md flex justify-center"
              />
            </div>
            <br />
            <div>
              <button className=""></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSignup;
