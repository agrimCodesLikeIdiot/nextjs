"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState();

  return (
    <>
      <div className="bg-[#0c002b] text-white w-screen h-screen">
        <nav className="flex bg-blue-500 font-sans text-white p-[15px] font-semibold">
          <div className="flex space-x-6">
            <button
              className="hover:animate-pulse"
              onClick={() => {
                const link = document.createElement("a");
                const file = new Blob([code], { type: "text/plain" });

                link.href = URL.createObjectURL(file);
                link.download = "main.py";
                link.click();
                URL.revokeObjectURL(link.href);
              }}
            >
              Save File
            </button>
            <button
              className="hover:animate-pulse"
              onClick={() => {
                const iframe = document.getElementById("terminal");

                iframe.setAttribute(
                  "srcDoc",
                  `
                <!DOCTYPE html>
                <html>
                  <head>
                    <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />
                    <script defer src="https://pyscript.net/latest/pyscript.js"></script>
                    <title>Terminal</title>
                  </head>
                  <body style="background: black; color: white;">
                    <div style="position:fixed; top:0;left:0">
                      <py-script>
                        ${code}
                      </py-script>
                    </div>
                  </body>
                </html>
                `
                );
              }}
            >
              Run on Terminal
            </button>
          </div>
        </nav>
        <div className="flex">
          <div className="w-[6vw] h-screen bg-[#110825] font-mono p-[15px]">
            <a href="https://github.com/" target="_blank">
              <button className="hover:animate-pulse">
                <img
                  src="https://img.icons8.com/material-outlined/48/FFFFFF/github.png"
                  alt="github"
                />
              </button>
            </a>
          </div>
          <div className="flex">
            <textarea
              onChange={(e) => {
                setCode(e.target.value);
              }}
              id="pycode"
              className="w-[47vw] h-screen bg-[#201733] outline-none p-[15px] font-mono resize-x"
              spellCheck={false}
            />
            <iframe
              id="terminal"
              className="w-[47vw] h-screen bg-black text-white resize-x"
            />
          </div>
        </div>
      </div>
    </>
  );
}
