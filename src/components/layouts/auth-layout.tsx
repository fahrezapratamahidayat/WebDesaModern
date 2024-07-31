import React from 'react'

export default function AuthLayout({children} : {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      {children}
    </div>
  );
}
