'use client'

import React, { ReactNode, useState } from "react";

// react => props => properties
export const Profile = ({name, children}: {name: string; children: ReactNode}) => {
  return <div className="text-red-500">
    {name}
    {children}  
  </div>
}



