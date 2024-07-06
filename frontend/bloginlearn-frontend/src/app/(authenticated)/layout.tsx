'use client';
import React, { ReactNode } from 'react'
import { AuthProvider } from '../context/useAuthContext'

export default function layout ({children} : any) {
  return (
    <>
    <AuthProvider>
      {children}
    </AuthProvider>
    </>
  )
}
