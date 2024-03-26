import React, { Fragment } from "react";
//rafce --> React Arrow Function Component with an Export
interface EV {
  id: number;
  brand: string; //you may declare the type of a few or all properties or key:valeu pairs
  model: string;
  year: number;
  range: number;
  isInProduction: boolean;
  isAwd: boolean;
}
//Here we'll perform server side data fetching
const UsersPage = async () => {
  const response = await fetch("http://localhost:2000/api/cars"); //With this approach we don't have to use the state hook or the effect hook with 0 dependancies
  const evs: EV[] = await response.json();
  return (
    <Fragment>
      <div className="text-center">Cars Page</div>
      <div>
        <h1 className="text-5xl text-violet-500 text-center underline m-12">
          Cars Info
        </h1>
        <ul className="text-fuchsia-400 text-center list-none m-12 flex-col font-light bg-rose-50">
          {evs.map((car, index) => (
            <li key={car.id} className=" hover:text-black">
              {index + 1}. {car.brand}-{car.model}-{car.year}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default UsersPage;
