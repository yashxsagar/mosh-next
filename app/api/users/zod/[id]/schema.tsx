import { z } from "zod";
//Using the below syntax we define the shape of our incoming obj (via the params prop/searchparams prop or the request body)
//And in turn our respective validation logic
const schema = z
  .object({
    id: z.number().int().min(1).max(10),
    name: z.string().min(3),
  })
  .required()
  .strict();
export default schema;
