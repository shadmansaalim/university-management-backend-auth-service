// Imports
import { RedisClient } from '../../../shared/redis';
import { AcademicSemesterConstants } from './academicSemester.constant';

// Listening to academic semester data from REDIS
const initAcademicSemesterEvents = async () => {
  await RedisClient.subscribe(
    AcademicSemesterConstants.event_academic_semester_created,
    async (event: string) => {
      const data = JSON.parse(event);
      console.log(data);
    }
  );
};

export default initAcademicSemesterEvents;
