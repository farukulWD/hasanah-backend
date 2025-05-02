export interface IProject extends Document {
    _id?: string;
    title: string;
    description: string;
    category?: string;
    image?: string;
    status?: 'active' | 'completed' | 'upcoming';
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }



  
  