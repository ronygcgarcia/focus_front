import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#1a202c",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "1em",
          color: "#fff",
          fontSize: "1.125rem",
        }}
      >
        <div
          style={{
            letterSpacing: ".05em",
          }}
        >
          404
        </div>
        <div
          style={{
            marginRight: "1em",
            marginLeft: "1em",
          }}
        >
          |
        </div>
        <div
          style={{
            letterSpacing: ".05em",
          }}
        >
          NOT FOUND
        </div>
      </div>
      <p style={{ textAlign: "center" }}>
        <Link
          to="/"
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "1em",
            color: "#fff",
            fontSize: "1.125rem",
            textDecoration: "underline",
          }}
        >
          Go to Home{" "}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
