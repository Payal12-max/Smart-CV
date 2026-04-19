
import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>

      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <ul className='list-disc pl-5 text-xs my-4 grid grid-cols-2 gap-y-2 gap-x-8'>
        {resumeInfo?.skills?.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SkillsPreview;
