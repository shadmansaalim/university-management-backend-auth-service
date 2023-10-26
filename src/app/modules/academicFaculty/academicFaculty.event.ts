// Imports
import { RedisClient } from '../../../shared/redis';
import { AcademicFacultyConstants } from './academicFaculty.constant';
import { IAcademicFacultyEvent } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

// Listening to academic faculty data from REDIS
const initAcademicFacultyEvents = async () => {
  // Create
  await RedisClient.subscribe(
    AcademicFacultyConstants.event_academic_faculty_created,
    async (event: string) => {
      const data: IAcademicFacultyEvent = JSON.parse(event);
      await AcademicFacultyService.createFacultyFromEvent(data);
    }
  );

  // Update
  await RedisClient.subscribe(
    AcademicFacultyConstants.event_academic_faculty_updated,
    async (event: string) => {
      const data: IAcademicFacultyEvent = JSON.parse(event);
      await AcademicFacultyService.updateFacultyFromEvent(data);
    }
  );

  // Delete
  await RedisClient.subscribe(
    AcademicFacultyConstants.event_academic_faculty_deleted,
    async (event: string) => {
      const data: IAcademicFacultyEvent = JSON.parse(event);
      await AcademicFacultyService.deleteFacultyFromEvent(data.id);
    }
  );
};

export default initAcademicFacultyEvents;
