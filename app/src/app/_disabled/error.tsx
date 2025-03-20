"use client";
import React from "react";

export default function Error() {
  return (
    <>
      {/* <head> */}
      <title>500: Internal Server Error</title>
      {/* </head> */}
      <div
        className="h-screen text-center flex flex-col items-center justify-center font-sans"
        data-testid="error-page"
      >
        <div>
          <style
            dangerouslySetInnerHTML={{
              __html: `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}`,
            }}
          />
          <h1 className="next-error-h1 inline-block m-0 mr-5 pr-6 text-2xl font-medium align-top leading-[49px]">
            500
          </h1>
          <div className="inline-block">
            <h2 className="text-sm font-normal leading-[49px] m-0">
              Internal Server Error
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
