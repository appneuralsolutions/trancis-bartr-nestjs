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

export enum Permission {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
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

export interface IUserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  bio: string;
  gender: Gender;
  gallery: [string];
  photo: string;
  birthDate: Date;
  userType: string;
  nationality: string;
  maritalStatus: MaritalStatus;
}

export interface IUserPersonal {
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
  members: Number;
  year: Number;
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

export interface IUserEducationSocialLink {
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
  socialLinks: [IUserEducationSocialLink];
}
export interface IUserEmployeementExperience {
  CompanyName: string;
  designation: string;
  position: string;
  responsibilities: [string];
  skills: [string];
  joined: string;
  resigned: string;
  resignationReason: string;
}

export interface IUserEmployeementAward {
  title: string;
  awardedOn: string;
  awardedby: string;
  awardedfor: string;
}

export interface IUserEmployeement {
  student: string;
  experience: [IUserEmployeementExperience];
  awards: [IUserEmployeementAward];
  projects: [IUserProject];
}

export interface IUserMedical {
  user: string;
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

export interface IUser {
  _id: string;
  email: string;
  phone: string;
  password: string;
  roles: [IRole];
  profile: IUserProfile;
  personal: IUserPersonal;
  medical: IUserMedical;
  educational: IUserEducation;
  employment: IUserEmployeement;
  auth: IUserAuth;
  isActive: boolean;
  jwtToken: string;
  picture: string;
}
