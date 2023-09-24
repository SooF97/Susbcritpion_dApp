import React from "react";
import CreateProfile from "../artists/CreateProfile";
import UploadMusic from "../artists/UploadMusic";
import SetSubscription from "../artists/SetSubscription";

const page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="font-3xl font-bold ">This page is only for Artists</h1>
      </div>
      <div className="m-2">
        <p className="flex flex-col items-center justify-center italic">
          Step 1
        </p>
        <CreateProfile />
      </div>
      <div className="m-2">
        <p className="flex flex-col items-center justify-center italic">
          Step 2
        </p>
        <UploadMusic />
      </div>
      <div className="m-2">
        <p className="flex flex-col items-center justify-center italic">
          Step 3
        </p>
        <SetSubscription />
      </div>
    </div>
  );
};

export default page;
