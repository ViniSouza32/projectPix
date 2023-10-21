import { Router, Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { UserController } from "../controllers/UserController";
import { User } from "../models/User";

const uController = new UserController();

async function validatePayload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const schema = yup.object({
    name: yup.string().min(3).max(255).required(),
    email: yup.string().email().min(3).max(255).required(),
    password: yup.string().min(3).max(255).required(),
  });
  const payload = req.body;
  try {
    req.body = await schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });
    return next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: "Oops" });
  }
}

async function validate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const id = Number(req.params.id);

  const user: User | null = await User.findOne(id);

  if (!user) {
    return res.status(422).json({ error: "User not found!" });
  }
  res.locals.user = user;

  return next();
}

const routes: Router = Router();
// List
routes.get("/users", uController.list);
// View a single user by id
routes.get("/users/:id", validate, uController.find);
// Create
routes.post("/users", validatePayload, uController.create);
// Update
routes.put("/users/:id", validate, validatePayload, uController.edit);
// Delete
routes.delete("/users/:id", validate, uController.delete);

export default routes;
