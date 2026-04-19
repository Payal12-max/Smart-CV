import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'

import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

import {
  DndContext,
  closestCenter
} from '@dnd-kit/core'

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable
} from '@dnd-kit/sortable'

import { CSS } from '@dnd-kit/utilities'

function SortableItem({ id, children }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab'
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

function ResumePreview() {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  // 👉 Convert sections into array for drag-drop
  const [sections, setSections] = useState([])

  useEffect(() => {
    setSections([
      { id: 'personal', type: 'PERSONAL' },
      { id: 'summary', type: 'SUMMARY' },
      { id: 'experience', type: 'EXPERIENCE' },
      { id: 'education', type: 'EDUCATION' },
      { id: 'skills', type: 'SKILLS' }
    ])
  }, [])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex(i => i.id === active.id)
      const newIndex = sections.findIndex(i => i.id === over.id)

      const newOrder = arrayMove(sections, oldIndex, newIndex)
      setSections(newOrder)
    }
  }

  // 👉 Render section based on type
  const renderSection = (type) => {
    switch (type) {
      case 'PERSONAL':
        return <PersonalDetailPreview resumeInfo={resumeInfo} />
      case 'SUMMARY':
        return <SummeryPreview resumeInfo={resumeInfo} />
      case 'EXPERIENCE':
        return resumeInfo?.Experience?.length > 0 && (
          <ExperiencePreview resumeInfo={resumeInfo} />
        )
      case 'EDUCATION':
        return resumeInfo?.education?.length > 0 && (
          <EducationalPreview resumeInfo={resumeInfo} />
        )
      case 'SKILLS':
        return resumeInfo?.skills?.length > 0 && (
          <SkillsPreview resumeInfo={resumeInfo} />
        )
      default:
        return null
    }
  }

  return (
    <div
      className='shadow-lg h-full p-14 border-t-[20px]'
      style={{ borderColor: resumeInfo?.themeColor }}
    >

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

        <SortableContext
          items={sections.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >

          {sections.map((section) => (
            <SortableItem key={section.id} id={section.id}>
              {renderSection(section.type)}
            </SortableItem>
          ))}

        </SortableContext>

      </DndContext>

    </div>
  )
}

export default ResumePreview