import * as mongoose from 'mongoose';

export const UserEducationalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  educations: [
    {
      standard: String,
      stream: [
        {
          type: String,
          enum: ['ARTS', 'COMMERCE', 'SCIENCE'],
          default: 'ARTS',
        },
      ],
      schooling: [{ enum: ['Private', 'Government'] }],
      school: String,
      grade: { type: String, enum: ['A', 'B', 'C', 'D'] },
      percentage: String,
      academicYear: String,
    },
  ],
  certifications: [
    {
      title: String,
      description: String,
      institute: String,
      duration: String,
      issueBy: String,
      completedOn: String,
    },
  ],
  skills: [
    {
      skill: String,
      type: { type: String, enum: ['SOFT', 'HARD'] },
      industry: String,
      experience: String,
    },
  ],
  internships: [
    {
      title: String,
      description: String,
      duration: String,
      company: String,
      projects: [
        {
          title: String,
          name: String,
          description: String,
          role: String,
          duration: String,
          members: Number,
          year: Number,
          technology: String,
          industry: String,
        },
      ],
    },
  ],
  hobbies: [String],
  otherActivities: [{ activity: String, date: String }],
  socialLinks: [{ name: String, link: String }],
}).set('timestamps', true);
