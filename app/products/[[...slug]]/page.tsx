import React from "react";
//Now let's implement access to the queryString parameter at this route end point as well  -->

interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}
const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center bg-candy-red border border-white rounded-lg">
        {slug &&
          slug.map((s, index) => {
            return (
              <>
                <div key={index} className="mx-10">
                  {s}
                </div>
              </>
            );
          })}
        {/* ProductPage - {slug}: {sortOrder} */}
      </div>
    </div>
  );
};

export default ProductPage;
