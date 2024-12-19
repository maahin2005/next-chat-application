"use client";

import { SessionProvider } from "next-auth/react"

import React from 'react'

function SessionsProviderWrapper({children}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionsProviderWrapper