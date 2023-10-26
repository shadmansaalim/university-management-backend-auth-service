// Imports
import { RedisClient } from '../../../shared/redis';
import { AcademicSemesterConstants } from './academicSemester.constant';
import { IAcademicSemesterEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

// Listening to academic semester data from REDIS
const initAcademicSemesterEvents = async () => {
  // Create
  await RedisClient.subscribe(
    AcademicSemesterConstants.event_academic_semester_created,
    async (event: string) => {
      const data: IAcademicSemesterEvent = JSON.parse(event);
      await AcademicSemesterService.createSemesterFromEvent(data);
    }
  );

  // Update
  await RedisClient.subscribe(
    AcademicSemesterConstants.event_academic_semester_updated,
    async (event: string) => {
      const data: IAcademicSemesterEvent = JSON.parse(event);
      await AcademicSemesterService.updateSemesterFromEvent(data);
    }
  );

  // Delete
  await RedisClient.subscribe(
    AcademicSemesterConstants.event_academic_semester_deleted,
    async (event: string) => {
      const data: IAcademicSemesterEvent = JSON.parse(event);
      await AcademicSemesterService.deleteSemesterFromEvent(data.id);
    }
  );
};

export default initAcademicSemesterEvents;
