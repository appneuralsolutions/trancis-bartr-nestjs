import { Permission } from '../interfaces/jwt-payload.interface';
import {
  EducationGrading,
  EducationSchooling,
  EducationStream,
  Gender,
  MaritalStatus,
  Skill,
  IUser,
  IRolePrivilege,
  IRole,
  IUserProfile,
  IUserPersonal,
  IUserEducationQualification,
  IUserEducationCertification,
  IUserEducationSkill,
  IUserProject,
  IUserEducationInternship,
  IUserEducationActivity,
  IUserEducationSocialLink,
  IUserEducation,
  IUserEmployeementExperience,
  IUserEmployeementAward,
  IUserEmployeement,
  IUserMedical,
  IUserAuth,
} from '../interfaces/user.interface';

export class RolePrivilege implements IRolePrivilege {
  name: string;
  code: number;
  permissions: [Permission];
}

export class Role implements IRole {
  name: string;
  privileges: [RolePrivilege];
}

export class UserProfile implements IUserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  bio: string;
  gender: Gender;
  gallery: [string];
  photo: string;
  birthDate: Date;
  nationality: string;
  maritalStatus: MaritalStatus;
}

export class UserPersonal implements IUserPersonal {
  firstName: string;
  middleName: string;
  lastName: string;
  bio: string;
  gender: Gender;
  gallery: [string];
  photo: string;
  birthDate: Date;
  nationality: string;
  maritalStatus: MaritalStatus;
}

export class UserEducationQualification implements IUserEducationQualification {
  standard: string;
  stream: [EducationStream];
  schooling: [EducationSchooling];
  school: string;
  grade: EducationGrading;
  percentage: string;
  academicYear: string;
}

export class UserEducationCertification implements IUserEducationCertification {
  title: string;
  description: string;
  institute: string;
  duration: string;
  issueBy: string;
  completedOn: string;
}

export class UserEducationSkill implements IUserEducationSkill {
  skill: string;
  type: Skill;
  industry: string;
  experience: string;
}

export class UserProject implements IUserProject {
  title: string;
  name: string;
  description: string;
  role: string;
  duration: string;
  members: Number;
  year: Number;
  technology: string;
  industry: string;
}

export class UserEducationInternship implements IUserEducationInternship {
  title: string;
  description: string;
  duration: string;
  company: string;
  projects: [UserProject];
}

export class UserEducationActivity implements IUserEducationActivity {
  activity: string;
  date: string;
}

export class UserEducationSocialLink implements IUserEducationSocialLink {
  name: string;
  link: string;
}

export class UserEducation implements IUserEducation {
  user: string;
  qualifications: [UserEducationQualification];
  certifications: [UserEducationCertification];
  skills: [UserEducationSkill];
  internships: [UserEducationInternship];
  hobbies: [string];
  otherActivities: [UserEducationActivity];
  socialLinks: [UserEducationSocialLink];
}

export class UserEmployeementExperience implements IUserEmployeementExperience {
  CompanyName: string;
  designation: string;
  position: string;
  responsibilities: [string];
  skills: [string];
  joined: string;
  resigned: string;
  resignationReason: string;
}

export class UserEmployeementAward implements IUserEmployeementAward {
  title: string;
  awardedOn: string;
  awardedby: string;
  awardedfor: string;
}

export class UserEmployeement implements IUserEmployeement {
  student: string;
  experience: [UserEmployeementExperience];
  awards: [UserEmployeementAward];
  projects: [UserProject];
}

export class UserMedical implements IUserMedical {
  user: string;
}

export class UserAuth implements IUserAuth {
  session: {
    isOnline: boolean;
    devices: [string];
    locations: [string];
  };
  validation: {
    email: boolean;
    phone: boolean;
  };
  verification: {
    email: boolean;
    phone: boolean;
  };
  accessibility: {
    atLocations: [string];
    onRoutes: [string];
    onTime: [string]; //cron expresssion
    atDevices: [string];
  };
  homeRoute: string;
  isLocked: boolean;
}

export class User implements IUser {
  _id: string;
  email: string;
  phone: string;
  password: string;
  roles: [Role];
  privileges: object;
  profile: UserProfile;
  personal: UserPersonal;
  medical: UserMedical;
  educational: UserEducation;
  employment: UserEmployeement;
  auth: UserAuth;
  isActive: boolean;
  jwtToken: string;
}
