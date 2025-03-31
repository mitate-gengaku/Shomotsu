export default function Forbidden() {
  return (
    <div
      style={{
        color: "#000",
        background: "#fff",
        height: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      data-testid="notfound-page"
    >
      <div className="flex items-center">
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
            borderRight: "1px solid rgba(0, 0, 0, 0.3)",
            margin: 0,
            marginRight: "20px",
            padding: "10px 23px 10px 0",
            fontSize: "24px",
            fontWeight: 500,
            verticalAlign: "top",
          }}
        >
          403
        </h1>
        <div
          style={{
            display: "inline-block",
            textAlign: "left",
            verticalAlign: "middle",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "normal",
              lineHeight: "inherit",
              margin: 0,
              padding: 0,
            }}
          >
            アクセス権限がありません
          </h2>
        </div>
      </div>
    </div>
  );
}
