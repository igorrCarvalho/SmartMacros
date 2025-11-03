import { Outlet } from "react-router-dom";

export default function PublicLayout({}) {
  return (
    <div className="w-[100vw] h-[100vh]">
      <Outlet />
    </div>
  );
}