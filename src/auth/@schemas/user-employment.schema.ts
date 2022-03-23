import * as mongoose from 'mongoose';

export const UserEmploymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  experience: [
    {
      CompanyName: String,
      designation: String,
      position: String,
      responsibilities: [String],
      skills: [String],
      joined: String,
      resigned: String,
      resignationReason: String,
    },
  ],
  awards: [
    {
      title: String,
      awardedOn: String,
      awardedby: String,
      awardedfor: String,
    },
  ],
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
}).set('timestamps', true);
