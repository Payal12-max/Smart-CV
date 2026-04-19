import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {

  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
 const params = useParams();
  // ✅ SAFE INITIAL STATE
  const [educationalList, setEducationalList] = useState([])

  // ✅ LOAD DATA SAFELY
  useEffect(() => {
    if (resumeInfo?.education) {
      setEducationalList(resumeInfo.education)
    }
  }, [resumeInfo])

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (event, index) => {
    const newEntries = [...educationalList]
    const { name, value } = event.target
    newEntries[index][name] = value
    setEducationalList(newEntries)
  }

  // ✅ ADD NEW
  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ])
  }

  // ✅ REMOVE
  const RemoveEducation = () => {
    setEducationalList((prev) => prev.slice(0, -1))
  }

  // ✅ SAVE TO BACKEND
  const onSave = () => {
    setLoading(true)

    //console.log("RESUME ID 👉", id);
    

    const data = {
        education: educationalList.map(({ id, ...rest }) => rest)
    }

    console.log("FINAL PAYLOAD:", data);
    GlobalApi.UpdateResumeDetail(params?.id, data)
      .then(() => {
        toast('Details updated!')
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        toast('Server Error, Please try again!')
      })
  }

  // ✅ UPDATE CONTEXT (NO INFINITE LOOP)
  useEffect(() => {
    if (educationalList.length > 0) {
      setResumeInfo(prev => ({
        ...prev,
        education: educationalList
      }))
    }
  }, [educationalList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList?.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>

              <div className='col-span-2'>
                <label>University Name</label>
                <Input
                  name="universityName"
                  value={item?.universityName || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  value={item?.degree || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Major</label>
                <Input
                  name="major"
                  value={item?.major || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item?.startDate || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item?.endDate || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div className='col-span-2'>
                <label>Description</label>
                <Textarea
                  name="description"
                  value={item?.description || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewEducation} className="text-primary">
            + Add More Education
          </Button>

          <Button variant="outline" onClick={RemoveEducation} className="text-primary">
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

export default Education