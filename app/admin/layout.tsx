import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex ">
      {/* The default direction of the flex in Tailwind CSS classes is row. So now we are defining a row with 2 cols --> Admin Sidebar and {children} */}
      {/* An HTMl element to render sidebars */}
      <aside className="bg-slate-200 p-5 mr-5">Admin Sidebar</aside>
      {/* Now setting up a div for content-area on the right */}
      <div>{children}</div>
      {/* The children placeholder above can be any pages (page.tsx) files within the /app/admin route in the Next.js project directory */}
    </div>
  );
};

export default AdminLayout;
