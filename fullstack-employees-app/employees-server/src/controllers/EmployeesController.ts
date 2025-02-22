import type { Request, Response } from 'express';
import { GetEmployeeResponse, GetEmployeesResponse } from './types';
import {AppPrismaClient} from '../prisma';
import { StatusCode } from '../constants/server';
import { BaseController } from './BaseController';


export class EmployeesController extends BaseController {
  public static async getAll(req: Request, res: Response<GetEmployeesResponse>) {
    try {
      const employees = await AppPrismaClient.employee.findMany();
      res.status(StatusCode.Ok).json({ employees });
    } catch {
      EmployeesController.sendInternalServerError(res, 'Unable to get all employees. Try again later');
    }
  }

  public static async getById(id: string, req: Request, res: Response<GetEmployeeResponse>) {
    try {
      const employee = await AppPrismaClient.employee.findUnique({
        where: { id }
      });

      if (!employee) {
        res.status(StatusCode.NotFound).json({ error: 'Employee Not Found' });
        return;
      }

      res.status(StatusCode.Ok).json({ employee });
    } catch {
      EmployeesController.sendInternalServerError(res, 'Unable to get all employees. Try again later');
    }
  }

  public static async create(req: Request, res: Response<GetEmployeeResponse>) {
    try {

    } catch {
      EmployeesController.sendInternalServerError(res, 'Unable to get all employees. Try again later');
    }
  }

  public static async deleteById(req: Request, res: Response) {
    try {

    } catch {
      EmployeesController.sendInternalServerError(res, 'Unable to get all employees. Try again later');
    }
  }

  public static async updateById(req: Request, res: Response<GetEmployeeResponse>) {
    try {

    } catch {
      EmployeesController.sendInternalServerError(res, 'Unable to get all employees. Try again later');
    }
  }
}