import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'
import dummy from '@/data/dummy'
import { useParams } from 'react-router-dom'
function Dashboard() {

  const { user } = useUser();
  const {resumeId} = useParams;
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        console.log("API RESPONSE 👉", resp);

        const data = resp?.data?.data || [];

        const formattedData = data.map(item => ({
          ...item,
          title: item.title || item.jobTitle || "Untitled Resume"
        }));

        setResumeList(formattedData);
      })
      .catch((err) => {
        console.log("ERROR 👉", err);
      });
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>

        {/* Add Resume */}
        <AddResume/>
        {resumeList.length>0?resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
        )):
        [1,2,3,4].map((item,index)=>(
          <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Dashboard