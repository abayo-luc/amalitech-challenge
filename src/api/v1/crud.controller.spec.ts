/* eslint-disable @typescript-eslint/no-explicit-any */
import CRUDController from './crud.controller';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Mock Mongoose model methods
const mockedPopulate = jest.fn();
const mockedFind = jest.fn().mockImplementation(() => ({
  populate: mockedPopulate,
}));
const mockedFindById = jest.fn().mockImplementation(() => ({
  populate: mockedPopulate,
}));
const mockedCreate = jest.fn();
const mockedFindByIdAndUpdate = jest.fn();
const mockedFindByIdAndDelete = jest.fn();

// Mock Mongoose model
const mockedModal = {
  find: mockedFind,
  findById: mockedFindById,
  create: mockedCreate,
  findByIdAndUpdate: mockedFindByIdAndUpdate,
  findByIdAndDelete: mockedFindByIdAndDelete,
  name: 'mockedModal',
} as unknown as mongoose.Model<any>;

// Mock Express request and response objects
const mockRequest = () => {
  const req = {} as Request;
  req.params = { id: '1' };
  req.body = {};
  return req;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('CRUDController', () => {
  let controller: CRUDController<any>;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    controller = new CRUDController(mockedModal);
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all records', async () => {
      mockedPopulate.mockResolvedValue(['record1', 'record2']);
      await controller.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Success',
        data: ['record1', 'record2'],
      });
    });

    it('should return 400 if error occurs', async () => {
      mockedPopulate.mockRejectedValue(new Error('unexpected error'));
      await controller.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: 'unexpected error',
      });
    });
  });

  describe('getOne', () => {
    it('should return a single record', async () => {
      mockedPopulate.mockResolvedValue('record');
      await controller.getOne(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Ok',
        data: 'record',
      });
    });

    it('should return 400 if error occurs', async () => {
      mockedPopulate.mockRejectedValue(new Error('unexpected error'));
      await controller.getOne(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: 'unexpected error',
      });
    });
  });

  describe('create', () => {
    it('should create and return a new record', async () => {
      mockedCreate.mockResolvedValue('newRecord');
      await controller.create(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Ok',
        data: 'newRecord',
      });
    });

    it('should return 400 if error occurs', async () => {
      mockedCreate.mockRejectedValue(new Error('Invalid email'));
      await controller.create(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Invalid email',
      });
    });
  });

  describe('update', () => {
    it('should update and return a record', async () => {
      mockedFindByIdAndUpdate.mockResolvedValue('updatedRecord');
      await controller.update(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Ok',
        data: 'updatedRecord',
      });
    });

    it('should return 400 if error occurs', async () => {
      mockedFindByIdAndUpdate.mockRejectedValue(new Error('unexpected error'));
      await controller.update(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: 'unexpected error',
      });
    });
  });

  describe('delete', () => {
    it('should delete a record', async () => {
      mockedFindByIdAndDelete.mockResolvedValue('deletedRecord');
      await controller.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 400 if error occurs', async () => {
      mockedFindByIdAndDelete.mockRejectedValue(new Error('unexpected error'));
      await controller.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: 'unexpected error',
      });
    });
  });
});
