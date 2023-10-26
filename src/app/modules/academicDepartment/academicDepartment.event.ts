// Imports
import { RedisClient } from '../../../shared/redis';
import { AcademicDepartmentConstants } from './academicDepartment.constant';
import { IAcademicDepartmentEvent } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

// Listening to academic department data from REDIS
const initAcademicDepartmentEvents = async () => {
  // Create
  await RedisClient.subscribe(
    AcademicDepartmentConstants.event_academic_department_created,
    async (event: string) => {
      const data: IAcademicDepartmentEvent = JSON.parse(event);
      await AcademicDepartmentService.createDepartmentFromEvent(data);
    }
  );

  // Update
  await RedisClient.subscribe(
    AcademicDepartmentConstants.event_academic_department_updated,
    async (event: string) => {
      const data: IAcademicDepartmentEvent = JSON.parse(event);
      await AcademicDepartmentService.updateDepartmentFromEvent(data);
    }
  );

  // Delete
  await RedisClient.subscribe(
    AcademicDepartmentConstants.event_academic_department_deleted,
    async (event: string) => {
      const data: IAcademicDepartmentEvent = JSON.parse(event);
      await AcademicDepartmentService.deleteDepartmentFromEvent(data.id);
    }
  );
};

export default initAcademicDepartmentEvents;
