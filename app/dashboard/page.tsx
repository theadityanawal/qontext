import { Resume, PersonalInfo } from '@/lib/types/database'

// Type-safe function
async function fetchUserResume(resumeId: string): Promise<Resume> {
    // Your fetch logic here
}

// Type-safe component props
interface ResumeEditorProps {
    personalInfo: PersonalInfo;
    onUpdate: (info: PersonalInfo) => void;
}
