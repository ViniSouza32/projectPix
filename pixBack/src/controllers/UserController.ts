import { User } from "../models/User";
import { Request, Response } from "express";
import { ILike } from "typeorm";

export class UserController {

  async create(req: Request, res: Response): Promise<Response> {
    const body = req.body;

    const user = User.create({
      name: body.name,
      password: body.password,
      quantity: body.quantity,
      type: body.type,
    });

    await user.save();

    return res.status(200).json(user);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const name = req.query.name;

    const users = await User.find({
      where: { name: name ? ILike(`%${name}%`) : undefined },
    });

    return res.status(200).json(users);
  }

  async find(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    const user = await User.findOne(id);

    if (!user) {
      return res.status(422).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const user: User = res.locals.user;

    console.log('delete ' + user.id);

    await user.remove();
    return res.status(200).json();
  }

  async edit(req: Request, res: Response): Promise<Response> {
    const body = req.body;
    const user: User = res.locals.user;

    user.name = body.name;
    user.password = body.password;
    user.quantity = body.quantity;
    user.type = body.type;

    await user.save();

    return res.status(200).json(user);
  }
}
