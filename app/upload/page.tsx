"use client";
import React, { Fragment, useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary"; //To render an image we're going to import the CldImage component from the Next-Cloudinary library
//To get your UploadPreset prop to the CldUploadWidget component from the next-cloudinary module, go to cloudinary.com -->> Settings -->> Upoads -->> Add Upload Preset --> Toggle to Unsigned
// In the Upload settings, if you leave the Folder setting blank, all the files will be uploaded in the root (/) of our cloud environment
interface CloudinaryUploadResult {
  public_id: string;
}
const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-pretty text-blue-800 font-mono">Upload Page</h1>
      {/* Here we display the image uploaded by the client/user using the CldImage functional component of the 'next-cloudinary' library */}
      {publicId && (
        <CldImage
          src={publicId}
          alt="Image Uploaded by the User"
          width={270}
          height={180}
        />
      )}
      <CldUploadWidget
        uploadPreset="wg9ojbfv"
        options={{
          sources: ["local", "url"],
          multiple: true,
          maxFiles: 3,
          styles: {
            palette: {
              window: "#000000",
              sourceBg: "#000000",
              windowBorder: "#8E9FBF",
              tabIcon: "#FFFFFF",
              inactiveTabIcon: "#8E9FBF",
              menuIcons: "#2AD9FF",
              link: "#08C0FF",
              action: "#336BFF",
              inProgress: "#00BFFF",
              complete: "#33ff00",
              error: "#EA2727",
              textDark: "#000000",
              textLight: "#FFFFFF",
            },
            fonts: {
              default: null,
              "'IBM Plex Sans', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",
                active: true,
              },
            },
          },
        }}
        onSuccess={(result, widget) => {
          // console.log(result)
          if (result.event !== "success") return;
          //We use type annotation to tell the TS compiler the expected type of this property
          const info = result.info as CloudinaryUploadResult;
          setPublicId(info.public_id);
        }}
      >
        {/* The on Success even upon triggering passes as parameter a result object which has 2 properties --> event: string and info:{public_url, thumbnail_url, height, format, originalfilename, public_id, etc. We need the Next-Cloudinary generated public_id field/property of the info object of the result object to  display an uploaded image/resource on our component} */}
        {/* Now let's also see how we can show uploaded images to the user/client. The CldUploadWidget Component also has a prop in its definition which is an event which gets triggered once the upload process is complete */}
        {/* This widget on it's own does not have a user interface. It renders anything we pass to it's children prop as a function. Yes, it accepts a fn as its children prop. Not standalone ReactNode*/}
        {/* Cloudinary always passes an object to this function within it's children prop. Let's access it's open function by destructuring it*/}
        {({ open }) => (
          <Fragment>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => open()}
            >
              Upload
            </button>
            {/* <button
              type="button"
              className="btn btn-warning"
              onClick={() => hide()}
            >
              {" "}
              Hide{" "}
            </button> */}
          </Fragment>
        )}
        {/* Cloudinary passes an object to it's children function prop. Let's destructure it and grab the open function */}
        {/* Since we are handling the onClick event for the upload button, we need to make this UploadFile component as 'useCLient' */}
      </CldUploadWidget>
    </div>
  );
};

export default UploadPage;
