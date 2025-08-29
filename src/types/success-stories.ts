export interface SuccessStory {
  id: string;
  name: string;
  location: string;
  designation?: string;
  story: string;
  outcome: string;
  avatar?: string;
  rating?: number;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  date?: string; // For backward compatibility
}
