'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function Page() {
  const [todos, setTodos] = useState<any[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, 'todos'))
      const todosList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTodos(todosList)
    }

    fetchTodos()
  }, [])

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
