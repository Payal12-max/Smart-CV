import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {

    // ✅ SAFE INITIAL STATE
    const [skillsList, setSkillsList] = useState([])
    const params = useParams();  // ✅ FIXED

    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    // ✅ LOAD DATA SAFELY
    useEffect(() => {
        if (resumeInfo?.skills) {
            setSkillsList(resumeInfo.skills)
        } else {
            setSkillsList([{ name: '' }]) // fallback
        }
    }, [resumeInfo])

    // ✅ HANDLE CHANGE
    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList]
        newEntries[index][name] = value
        setSkillsList(newEntries)
    }

    // ✅ ADD
    const AddNewSkills = () => {
        setSkillsList([
            ...skillsList,
            { name: '' }
        ])
    }

    // ✅ REMOVE
    const RemoveSkills = () => {
        setSkillsList((prev) => prev.slice(0, -1))
    }

    // ✅ SAVE (FIXED ID)
    const onSave = () => {
        setLoading(true);

        const cleanedSkills = skillsList.map(({ id, name }) => ({
            name: name || ""
        }));

        const data = {
                skills: cleanedSkills
        };


        console.log("FINAL PAYLOAD:", data);
        
        GlobalApi.UpdateResumeDetail(params?.id, data)
            .then(() => {
                setLoading(false);
                toast('Details updated!');
            })
            .catch((err) => {
                console.log("ERROR 👉", err.response?.data);
                setLoading(false);
            });
    };

    // ✅ UPDATE CONTEXT SAFELY
    useEffect(() => {
        if (skillsList.length > 0) {
            setResumeInfo(prev => ({
                ...prev,
                skills: skillsList
            }))
        }
    }, [skillsList])

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className='mb-2 border rounded-lg p-3'>
                        <label className='text-xs'>Skill</label>
                        <Input
                            className="w-full"
                            value={item.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary">
                        + Add More Skill
                    </Button>

                    <Button variant="outline" onClick={RemoveSkills} className="text-primary">
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

export default Skills;