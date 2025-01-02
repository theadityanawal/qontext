import { databases, APPWRITE_DATABASE_ID, COLLECTIONS } from '@/config/appwrite';
import { ID } from 'appwrite';

export async function setupDatabase() {
    try {
        await createUsersCollection();
        await createResumesCollection();
        await createPersonalInfoCollection();
        await createWorkExperienceCollection();
        await createEducationCollection();
        await createProjectsCollection();
        await createLinksCollection();

        console.log('Database setup completed successfully');
    } catch (error) {
        console.error('Database setup failed:', error);
    }
}

async function createUsersCollection() {
    try {
        const collection = await databases.createCollection(
            APPWRITE_DATABASE_ID,
            ID.unique(),
            COLLECTIONS.USERS
        );

        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'email',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'name',
            255,
            true
        );
        await databases.createDatetimeAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'created_at',
            true
        );

        await databases.createIndex(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'email_idx',
            'unique',
            ['email']
        );

        console.log('Users collection created');
    } catch (error) {
        console.error('Failed to create users collection:', error);
    }
}

async function createResumesCollection() {
    try {
        const collection = await databases.createCollection(
            APPWRITE_DATABASE_ID,
            ID.unique(),
            COLLECTIONS.RESUMES
        );

        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'user_id',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'type',
            255,
            true,
            ['base', 'ai_generated']
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'parent_resume_id',
            255,
            false
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'job_description',
            65535,
            false
        );
        await databases.createDatetimeAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'created_at',
            true
        );
        await databases.createDatetimeAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'last_updated',
            true
        );

        await databases.createIndex(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'user_resumes',
            'key',
            ['user_id']
        );

        console.log('Resumes collection created');
    } catch (error) {
        console.error('Failed to create resumes collection:', error);
    }
}

async function createPersonalInfoCollection() {
    try {
        const collection = await databases.createCollection(
            APPWRITE_DATABASE_ID,
            ID.unique(),
            COLLECTIONS.PERSONAL_INFO
        );

        // Basic Info
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'headline',
            255,
            true
        );

        // Contact Info (as object)
        await databases.createObjectAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'contact',
            {
                "email": "string",
                "phone": "string",
                "location": "string"
            },
            true
        );

        // Skills (merged from skills collection)
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'skills_category',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'skills_list',
            255,
            true,
            true  // is array
        );

        // Certifications (merged)
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'certifications',
            255,
            false,
            true  // is array
        );

        await databases.createIndex(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id_idx',
            'unique',
            ['resume_id']
        );

        console.log('Personal Info collection created');
    } catch (error) {
        console.error('Failed to create personal info collection:', error);
    }
}

async function createWorkExperienceCollection() {
    try {
        const collection = await databases.createCollection(
            APPWRITE_DATABASE_ID,
            ID.unique(),
            COLLECTIONS.WORK_EXPERIENCE
        );

        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'title',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'company',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'location',
            255,
            true
        );
        await databases.createDatetimeAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'start_date',
            true
        );
        await databases.createDatetimeAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'end_date',
            false
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'description',
            65535,
            true,
            true  // is array
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'achievements',
            65535,
            false,
            true  // is array
        );

        await databases.createIndex(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id_idx',
            'key',
            ['resume_id']
        );

        console.log('Work Experience collection created');
    } catch (error) {
        console.error('Failed to create work experience collection:', error);
    }
}

async function createEducationCollection() {
    try {
        const collection = await databases.createCollection(
            APPWRITE_DATABASE_ID,
            ID.unique(),
            COLLECTIONS.EDUCATION
        );

        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'institution',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'degree',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'field_of_study',
            255,
            true
        );
        await databases.createDatetimeAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'start_date',
            true
        );
        await databases.createDatetimeAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'end_date',
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'grade',
            255,
            false
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'description',
            65535,
            false,
            true  // is array
        );

        await databases.createIndex(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id_idx',
            'key',
            ['resume_id']
        );

        console.log('Education collection created');
    } catch (error) {
        console.error('Failed to create education collection:', error);
    }
}

async function createProjectsCollection() {
    try {
        const collection = await databases.createCollection(
            APPWRITE_DATABASE_ID,
            ID.unique(),
            COLLECTIONS.PROJECTS
        );

        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'title',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'description',
            65535,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'technologies',
            255,
            true,
            true  // is array
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'url',
            1024,
            false
        );
        await databases.createDatetimeAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'start_date',
            true
        );
        await databases.createDatetimeAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'end_date',
            false
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'achievements',
            65535,
            false,
            true  // is array
        );

        await databases.createIndex(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id_idx',
            'key',
            ['resume_id']
        );

        console.log('Projects collection created');
    } catch (error) {
        console.error('Failed to create projects collection:', error);
    }
}

async function createLinksCollection() {
    try {
        const collection = await databases.createCollection(
            APPWRITE_DATABASE_ID,
            ID.unique(),
            COLLECTIONS.LINKS
        );

        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'platform',
            255,
            true
        );
        await databases.createStringAttribute(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'url',
            1024,
            true
        );

        await databases.createIndex(
            APPWRITE_DATABASE_ID,
            collection.$id,
            'resume_id_idx',
            'key',
            ['resume_id']
        );

        console.log('Links collection created');
    } catch (error) {
        console.error('Failed to create links collection:', error);
    }
}
