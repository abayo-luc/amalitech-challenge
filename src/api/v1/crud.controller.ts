import { Request, Response } from 'express';
import { Model } from 'mongoose';

/**
 * @description main controller
 * @class Main
 */
class CRUDController<T extends Document> {
  model: Model<T>;
  include?: string[];
  /**
   * @constructor
   * @param {Model} model - Model object
   * @param {string[]} include - Array of strings to populate
   */
  constructor(model: Model<T>, include?: string[]) {
    this.model = model;
    this.include = include;
  }
  /**
   * @route GET /api/v1/*
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @returns {object} 200 - An array of record info
   * @returns {Error}  default - Unexpected error
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const records = await this.model.find().populate(this.include || '');
      return res.status(200).send({ message: 'Success', data: records });
    } catch (error) {
      const e = error as Error;
      return res.status(400).send({ message: e.message });
    }
  };

  /**
   * @route GET /api/v1/*
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @returns {object} 200 - An  record info
   * @returns {Error}  default - Unexpected error
   */
  getOne = async (req: Request, res: Response) => {
    try {
      const record = await this.model
        .findById(req.params.id)
        .populate(this.include || '');
      return res.status(200).send({ message: 'Ok', data: record });
    } catch (error) {
      const e = error as Error;
      return res.status(400).send({ message: e.message });
    }
  };

  /**
   * @route POST /api/v1/*
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @returns {object} 200 - An  record info
   * @returns {Error}  default - Unexpected error
   */
  create = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const record = await this.model.create(body);
      return res.status(200).send({ message: 'Ok', data: record });
    } catch (error) {
      const e = error as Error;
      return res.status(400).send({ message: e.message });
    }
  };

  /**
   * @route PUT /api/v1/*
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @returns {object} 200 - An  record info
   * @returns {Error}  default - Unexpected error
   */
  update = async (req: Request, res: Response) => {
    const {
      body: payload,
      params: { id },
    } = req;

    try {
      const updatedUser = await this.model.findByIdAndUpdate(id, payload, {
        new: true,
      });

      if (!updatedUser) {
        return res
          .status(404)
          .send({ message: `${this.model.name} was not found` });
      }
      return res.status(200).send({ message: 'Ok', data: updatedUser });
    } catch (error) {
      const e = error as Error;
      return res.status(400).send({ message: e.message });
    }
  };

  /**
   * @route DELETE /api/v1/*
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @returns {object} 200 - An  record info
   * @returns {Error}  default - Unexpected error
   */
  delete = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    try {
      const user = await this.model.findByIdAndDelete(id);
      if (!user) {
        return res
          .status(404)
          .send({ message: `${this.model.name} was not found` });
      }
      return res.status(204).send();
    } catch (error) {
      const e = error as Error;
      return res.status(400).send({ message: e.message });
    }
  };
}

export default CRUDController;
