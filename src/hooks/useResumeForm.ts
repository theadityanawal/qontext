import { useState, useEffect } from 'react'
import { Client, Databases, ID } from 'appwrite'

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID')

const databases = new Databases(client)

export function useResumeForm() {
  const [resumeData, setResumeData] = useState({
    personal_information: {
      name: '',
      headline: '',
      contact: { email: '', phone: '', location: '' },
      social_links: [],
    },
    summary: '',
    work_experience: [],
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchResumeData()
  }, [])

  const fetchResumeData = async () => {
    try {
      setLoading(true)
      const response = await databases.getDocument('YOUR_DATABASE_ID', 'YOUR_COLLECTION_ID', 'YOUR_DOCUMENT_ID')
      setResumeData(response)
    } catch (error) {
      console.error('Error fetching resume data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateResumeData = (key: string, value: any) => {
    setResumeData((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const saveResume = async () => {
    try {
      setLoading(true)
      await databases.updateDocument('YOUR_DATABASE_ID', 'YOUR_COLLECTION_ID', 'YOUR_DOCUMENT_ID', resumeData)
      alert('Resume saved successfully!')
    } catch (error) {
      console.error('Error saving resume:', error)
      alert('Error saving resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { resumeData, updateResumeData, saveResume, loading }
}

