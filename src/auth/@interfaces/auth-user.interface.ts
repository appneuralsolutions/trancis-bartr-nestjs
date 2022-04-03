export enum Permission {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum MaritalStatus {
  MARRIED = 'married',
  UN_MARRIED = 'un-married',
}

export enum EducationStream {
  ARTS = 'arts',
  COMMERCE = 'commerce',
  SCIENCE = 'science',
}

export enum EducationSchooling {
  PRIVATE = 'private',
  GOVERNMENT = 'government',
}

export enum EducationGrading {
  A,
  B,
  C,
  D,
}

export enum Skill {
  HARD = 'hard',
  SOFT = 'soft',
}

export interface IRolePrivilege {
  name: string;
  code: number;
  permissions: [Permission];
}

export interface IRole {
  name: string;
  privileges: [IRolePrivilege];
}

export interface IUserAuth {
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

export interface IUserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  bio: string;
  gender: Gender;
  gallery: [];
  photo: string;
  birthDate: Date;
  mobileNo: string;
  nationality: string;
  maritalStatus: MaritalStatus;
  // socialLinks: [{ name: string; url: string }];
}

export interface IUserEducationQualification {
  standard: string;
  stream: [EducationStream];
  schooling: [EducationSchooling];
  school: string;
  grade: EducationGrading;
  percentage: string;
  academicYear: string;
}

export interface IUserEducationCertification {
  title: string;
  description: string;
  institute: string;
  duration: string;
  issueBy: string;
  completedOn: string;
}

export interface IUserEducationSkill {
  skill: string;
  type: Skill;
  industry: string;
  experience: string;
}

export interface IUserProject {
  title: string;
  name: string;
  description: string;
  role: string;
  duration: string;
  members: number;
  year: number;
  technology: string;
  industry: string;
}

export interface IUserEducationInternship {
  title: string;
  description: string;
  duration: string;
  company: string;
  projects: [IUserProject];
}

export interface IUserEducationActivity {
  activity: string;
  date: string;
}

export interface IUserSocialLink {
  name: string;
  link: string;
}

export interface IUserEducation {
  user: string;
  qualifications: [IUserEducationQualification];
  certifications: [IUserEducationCertification];
  skills: [IUserEducationSkill];
  internships: [IUserEducationInternship];
  hobbies: [string];
  otherActivities: [IUserEducationActivity];
  socialLinks: [IUserSocialLink];
}
export interface IUserEmploymentExperience {
  CompanyName: string;
  designation: string;
  position: string;
  responsibilities: [string];
  skills: [string];
  joined: string;
  resigned: string;
  resignationReason: string;
}

export interface IUserEmploymentAward {
  title: string;
  awardedOn: string;
  awardedBy: string;
  awardedFor: string;
}

export interface IUserEmployment {
  student: string;
  experience: [IUserEmploymentExperience];
  awards: [IUserEmploymentAward];
  projects: [IUserProject];
}

export interface IUserMedical {
  user: string;
}

export interface IUserActivity {
  user: string;
  route: string;
  action: string;
  describe: string;
  timestamp: Date;
}

export interface IAuthUser {
  _id: string;
  email: string;
  phone: string;
  uname: string;
  password: string;
  roles: [IRole];
  auth: IUserAuth;
  isActive: boolean;
  privileges: object;
  profile: IUserProfile;
  medical: IUserMedical;
  educational: IUserEducation;
  employment: IUserEmployment;
  jwtToken: string;
}
