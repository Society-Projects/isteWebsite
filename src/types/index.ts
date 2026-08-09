export type EventCategory = 'Workshops' | 'Hackathons' | 'Competitions' | 'Technical Sessions' | 'Guest Lectures' | 'Collaborations';

export interface Speaker {
  name: string;
  role: string;
  avatar?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time?: string;
  venue: string;
  shortDescription: string;
  description: string;
  image: string;
  speakers?: Speaker[];
  galleryImages?: string[];
  registrationUrl?: string;
  isUpcoming: boolean;
  featured?: boolean;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'Web Dev' | 'AI & ML' | 'Cyber Security' | 'Mobile Apps' | 'IoT & Hardware';
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  contributors: {
    name: string;
    role: string;
    avatar?: string;
  }[];
  featured: boolean;
  stars?: number;
}

export type TeamSection = 'faculty' | 'eb' | 'core' | 'alumni';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  section: TeamSection;
  department?: string;
  image: string;
  linkedin?: string;
  github?: string;
  email?: string;
  bio?: string;
  batch?: string;      // For alumni
  company?: string;    // For alumni
  position?: string;   // For alumni
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Workshops' | 'Team' | 'Projects' | 'Achievements';
  image: string;
  date: string;
  description?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  category: 'Gold Sponsor' | 'Title Partner' | 'Tech Partner' | 'Beverage Partner' | 'Learning Partner';
  website?: string;
}
