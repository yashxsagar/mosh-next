// import { PrismaClient } from "@prisma/client";
// //Anytime we define or change/update a model and perform a migration, Prisma CLI re-generates this new Prisma Client reflecting all the schema/model/entities and field/constraint changes
// //So the PrismaCLient is always in sync with our Prisma data model

// const prisma = new PrismaClient();
// //Creating an instance of the PrismaClient class that has been imported into our schema.ts file

// //Here we have access to the models/entities we have created in our 'schema.prisma' file

// // prisma.user
// // prisma.user.create;
// //Within the newly generated prisma client's enity property (such as user) we have access to functions for creating, reading, updating and deleting records/objects

// export default prisma;
// //Exported prisma client object to be used in the backend business logic layer of our Next.js application

//However using the above techique we end up with an error usually as : Too many instances of Prisma Client are already running. This is as in Dev mode <npm run dev>, Hot Refresh is prevalent which automatically refreshes certain modules including Prisma Client in our project, thereby creating several instances of the Prisma Client and breaching the no. of db connections threshold to the db engine/MySql or PostgreSql

//This is the industry standard way of generating artifacts, i.e. a Prisma client which is the abstraction that enables db interaction with out backend server logic

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
