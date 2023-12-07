import React from "react";
import { Outlet } from "react-router-dom";

export default function OnlyLayout() {
  return (
    <>
      <footer
        style={{
          bottom: "24px",
          left: "0",
          paddingLeft: "23px",
          width: "100%",
          position: "absolute",
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "14px",
          fontStyle: "normal",
        }}
      >
        Copyright © {new Date().getFullYear()}
      </footer>
      <Outlet />
    </>
  );
}
