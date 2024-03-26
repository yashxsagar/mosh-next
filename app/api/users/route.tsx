//We define a route handler. A route habdler is a function that handles an HTTP request at a given end-point
//GET - for getting a collection or individual data objects
// POST - for creating data
// PUT - for updating data
// DELETE - for deleting data

import { NextRequest, NextResponse } from "next/server";

//Let's define a route handler now -->

let evs = [
  {
    id: 1,
    brand: "Tesla",
    model: "Model S",
    year: 2024,
    range: 405, // miles
    isInProduction: true,
    isAwd: true,
  },
  {
    id: 2,
    brand: "KIA",
    model: "EV6",
    year: 2024,
    range: 310, // miles
    isInProduction: true,
    isAwd: true,
  },
  {
    id: 3,
    brand: "Ford",
    model: "Mustang Mach-E",
    year: 2024,
    range: 314, // miles
    isInProduction: true,
    isAwd: true,
  },
  {
    id: 4,
    brand: "Chevrolet",
    model: "Bolt EV",
    year: 2024,
    range: 259, // miles
    isInProduction: true,
    isAwd: false,
  },
  {
    id: 5,
    brand: "Nissan",
    model: "Leaf",
    year: 2024,
    range: 149, // miles
    isInProduction: true,
    isAwd: false,
  },
  {
    id: 6,
    brand: "Tesla",
    model: "Model P Roadster 2020",
    year: 2020,
    range: 650, // miles
    isInProduction: true,
    isAwd: true,
  },
];

export function GET(request: NextRequest) {
  //Always use this parameter to prevent caching. If you skip the usage of the <request> parameter which is syntactically permitted, Next.js will cache the page at the client and show them a cached copy instead always
  //In a real app, we actually fetch users from a db
  //For now we are hard coding the collection of objects in our db
  return NextResponse.json(evs);
}

//Now let's practice a POST route handler for creating a user object in our backend's object collection -->

export async function POST(request: NextRequest) {
  const body = await request.json();
  //Now let's just return the body in the response itself --> Whatever we send in the body we get back as an API response
  //   return NextResponse.json(request.ip);
  //   await request.body;
  //   return Response.json({ url: request.url });
  //Validate
  //If Invalid, return 400
  //Else, return 201 with the newly created object ID
  if (!body.name || !(body.name.length > 2)) {
    return NextResponse.json(
      { error: "The name should be greaater than 2 characters" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { id: 2, name: body.name },
    { status: 201, statusText: "Object Created Successfully" }
  );
}
