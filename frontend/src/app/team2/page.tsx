// src/app/Team/page.tsx

import React from 'react'
import MeetTheTeam from '@/components/core/Members'

// Naming the function for better debugging and to resolve ESLint errors
const TeamPage = () => {
  return (
    <div>
      <MeetTheTeam />
    </div>
  );
}

// Setting a display name (optional, but good practice)
TeamPage.displayName = 'TeamPage';

// Export the named function
export default TeamPage;
