import { Client, Databases, Account } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

// Initialize Appwrite services
export const databases = new Databases(client);
export const account = new Account(client);

// Database and collection IDs
export const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;

export const COLLECTIONS = {
    USERS: 'users',
    RESUMES: 'resumes',
    PERSONAL_INFO: 'personal_info',
    WORK_EXPERIENCE: 'work_experience',
    EDUCATION: 'education',
    PROJECTS: 'projects',
    LINKS: 'links'
} as const;

export default client;
