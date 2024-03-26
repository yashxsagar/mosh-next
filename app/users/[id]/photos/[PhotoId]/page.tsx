import React, { Fragment } from "react";

interface Props {
  params: { id: number; PhotoId: number };
}
const UserPhoto = ({ params: { id, PhotoId } }: Props) => {
  return (
    <Fragment>
      <div>UserPhoto Page</div>
      <div className="alert alert-success text-center">
        <p>
          User Id: {id}&apos;s Photo: {PhotoId}
        </p>
      </div>
    </Fragment>
  );
};

export default UserPhoto;
