import { Router } from 'express';
import { AuthGuard } from '../middleware/auth';
import { EmployeesController } from '../controllers/EmployeesController';
import { EmployeeValidator } from '../validators/EmployeeValidator';
import validationErrors from '../middleware/handleValidationErrors';

const EmployeeRouter = Router();

EmployeeRouter.get('/', AuthGuard, EmployeesController.getAll);
EmployeeRouter.post('/', AuthGuard, EmployeeValidator.createDto, validationErrors, EmployeesController.create);

EmployeeRouter.get('/:id', AuthGuard, EmployeesController.getById);
EmployeeRouter.delete('/:id', AuthGuard, EmployeesController.deleteById);
EmployeeRouter.put('/:id', AuthGuard, EmployeeValidator.createDto, validationErrors, EmployeesController.updateById);

export { EmployeeRouter };


