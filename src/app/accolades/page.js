'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  const router = useRouter()
  useEffect(() => {
    if (router) {

      router.push('/accolades/score-sheet')
    }
  }, [router])
  return (
    <div>

    </div>
  )
}

export default Page
