import React from "react";

export default function NotFound() {
  return (
    <div
      style={{
        color: "#000",
        background: "#fff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      data-testid="notfound-page"
    >
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          body { margin: 0 }
        `,
          }}
        />
        <h1
          style={{
            display: "inline-block",
            margin: 0,
            padding: "10px 23px 10px 0",
            fontSize: "48px",
            fontWeight: 500,
            verticalAlign: "top",
          }}
        >
          404
        </h1>
      </div>
    </div>
  );
}
