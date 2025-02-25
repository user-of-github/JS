import type { Request, Response } from 'express';
import { CreateEmployeeDto, EmployeeResponse, GetEmployeesResponse, UpdateEmployeeDto } from './types';
import { AppPrismaClient } from '../prisma';
import { StatusCode } from '../constants/server';
import { BaseController } from './BaseController';
import { Employee, User } from '@prisma/client';


export class EmployeesController extends BaseController {
  public static async getAll(req: Request, res: Response<GetEmployeesResponse>) {
    try {
      const employees = await AppPrismaClient.employee.findMany();
      res.status(StatusCode.Ok).json({employees});
    } catch {
      EmployeesController.sendInternalServerError(res, 'Unable to get all employees. Try again later');
    }
  }

  public static async getById(req: Request, res: Response<EmployeeResponse>) {
    try {
      const employee = await AppPrismaClient.employee.findUnique({
        where: { id: req.params.id }
      });

      if (!employee) {
        res.status(StatusCode.NotFound).json({error: 'Employee Not Found'});
        return;
      }

      res.status(StatusCode.Ok).json({employee});
    } catch {
      EmployeesController.sendInternalServerError(res, 'Unable to get all employees. Try again later');
    }
  }

  public static async create(req: Request<{}, {}, CreateEmployeeDto>, res: Response<EmployeeResponse>) {
    const data = req.body;

    try {
      const employee = await AppPrismaClient.employee.create({
        data: {
          ...data,
          userId: (req as unknown as { user: User }).user.id
        }
      });

      res.status(StatusCode.Created).json({employee} as EmployeeResponse); /* @TODO: ATTENTION: */

    } catch (error) {
      EmployeesController.sendInternalServerError(res, 'Unable to add a new employee. Try again later');
    }
  }

  public static async deleteById(req: Request<any, {}, UpdateEmployeeDto>, res: Response) {
    try {
      /* without this check Prisma throws error
      "An operation failed because it depends on one or more records that were required but not found.
       Record to delete does not exist.". So made a check and put it into transaction */

      await AppPrismaClient.$transaction(async (prisma) => {
        const employee = await prisma.employee.findUnique({
          where: { id: req.params.id },
        });

        if (employee) {
          await prisma.employee.delete({ where: { id: req.params.id } });
        }
      });
      res.status(StatusCode.NoContent).json({});
    } catch (error) {
      console.log(error)
      EmployeesController.sendInternalServerError(res, 'Unable to delete employee. Try again later');
    }
  }

  public static async updateById(req: Request, res: Response<EmployeeResponse>) {
    const data = req.body;

    try {
      const updated = await AppPrismaClient.employee.update({where: { id: req.params.id }, data: data});
      res.status(StatusCode.NoContent).json({ employee: updated });
    } catch {
      EmployeesController.sendInternalServerError(res, 'Unable to edit an employee. Try again later');
    }
  }
}