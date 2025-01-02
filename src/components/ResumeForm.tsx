'use client'

import { useState } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import PersonalInfoForm from './PersonalInfoForm'
import WorkExperienceForm from './WorkExperienceForm'
import EducationForm from './EducationForm'
import ProjectsForm from './ProjectsForm'
import SkillsForm from './SkillsForm'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ResumeForm() {
  const { resumeData, updateResumeData, saveResume, loading } = useResumeForm()
  const [activeTab, setActiveTab] = useState('personal')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveResume()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="experience">Work Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <PersonalInfoForm data={resumeData.personal_information} updateData={updateResumeData} />
        </TabsContent>
        <TabsContent value="experience">
          <WorkExperienceForm data={resumeData.work_experience} updateData={updateResumeData} />
        </TabsContent>
        <TabsContent value="education">
          <EducationForm data={resumeData.education} updateData={updateResumeData} />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsForm data={resumeData.projects} updateData={updateResumeData} />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsForm data={resumeData.skills} updateData={updateResumeData} />
        </TabsContent>
      </Tabs>
      <Button type="submit" className="mt-6" disabled={loading}>
        {loading ? 'Saving...' : 'Save Resume'}
      </Button>
    </form>
  )
}

