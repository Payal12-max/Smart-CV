import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

function Experience() {
    const [experinceList, setExperinceList] = useState([])
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const params = useParams();
    const [loading, setLoading] = useState(false)

    // ✅ LOAD DATA ONCE
    useEffect(() => {
        if (resumeInfo?.Experience?.length > 0) {
            setExperinceList(resumeInfo.Experience)
        }
    }, [resumeInfo])

    // ✅ HANDLE INPUT CHANGE
    const handleChange = (index, event) => {
        const newEntries = [...experinceList]
        const { name, value } = event.target
        newEntries[index][name] = value
        setExperinceList(newEntries)
    }

    // ✅ ADD EXPERIENCE
    const AddNewExperience = () => {
        setExperinceList([
            ...experinceList,
            {
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                workSummery: ''
            }
        ])
    }

    // ✅ REMOVE EXPERIENCE
    const RemoveExperience = () => {
        if (experinceList.length > 0) {
            setExperienceList(prev => prev.slice(0, -1))
        }
    }

    // ✅ RICH TEXT
    const handleRichTextEditor = (value, name, index) => {
        const newEntries = experinceList.slice();
        newEntries[index][name] = value
        setExperinceList(newEntries)
    }

    useEffect(() => {
        if (experinceList.length > 0) {
            setResumeInfo(prev => ({
                ...prev,
                Experience: experinceList
            }))
        }
    }, [experinceList])

    // ✅ SAVE TO STRAPI
    const onSave = () => {
        setLoading(true)

        
        const data = {
                Experience: experinceList
        }
        console.log("FINAL PAYLOAD:", data);
        GlobalApi.UpdateResumeDetail(params?.id, data)
            .then(() => {
                setLoading(false)
                toast('Details updated!')
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add your previous job experience</p>

            <div>
                {experinceList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>

                        <Input name="title" placeholder="Position" value={item?.title} onChange={(e) => handleChange(index, e)} />

                        <Input name="companyName" placeholder="Company" value={item?.companyName} onChange={(e) => handleChange(index, e)} />

                        <Input name="city" placeholder="City" value={item?.city} onChange={(e) => handleChange(index, e)} />

                        <Input name="state" placeholder="State" value={item?.state} onChange={(e) => handleChange(index, e)} />

                        <Input type="date" name="startDate" value={item?.startDate} onChange={(e) => handleChange(index, e)} />

                        <Input type="date" name="endDate" value={item?.endDate} onChange={(e) => handleChange(index, e)} />

                        <div className='col-span-2'>
                            <RichTextEditor
                                index={index}
                                value={item?.workSummery}
                                onRichTextEditorChange={(value) =>
                                    handleRichTextEditor(value, 'workSummery', index)
                                }
                            />
                        </div>

                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewExperience}>
                        + Add More
                    </Button>

                    <Button variant="outline" onClick={RemoveExperience}>
                        - Remove
                    </Button>
                </div>

                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Experience