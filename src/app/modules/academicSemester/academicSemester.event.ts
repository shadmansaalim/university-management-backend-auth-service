// Imports
import { RedisClient } from '../../../shared/redis';
import { AcademicSemesterConstants } from './academicSemester.constant';
import { IAcademicSemesterCreatedEvent } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

// Listening to academic semester data from REDIS
const initAcademicSemesterEvents = async () => {
  await RedisClient.subscribe(
    AcademicSemesterConstants.event_academic_semester_created,
    async (event: string) => {
      const data: IAcademicSemesterCreatedEvent = JSON.parse(event);
      await AcademicSemesterService.createSemesterFromEvent(data);
      console.log(data);
    }
  );
};

export default initAcademicSemesterEvents;
