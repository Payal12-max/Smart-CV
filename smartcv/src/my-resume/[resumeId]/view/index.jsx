import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'

function ViewResume() {

    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { documentId } = useParams();

    useEffect(() => {
        if (!documentId) return;
        GetResumeInfo();
    }, [documentId]);
    const GetResumeInfo = async () => {
        try {
            const resp = await GlobalApi.GetResumeById(documentId);
            console.log("API RESPONSE:", resp.data);

            setResumeInfo(resp?.data?.data || null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const HandleDownload = () => {
        const waitForRender = setInterval(() => {
            if (resumeInfo) {
                clearInterval(waitForRender);
                window.print();
            }
        }, 300);
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
            <div id="no-print">
                <Header />

                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique
                        resume with your friends and family </p>
                    <div className='flex justify-center items-center my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                    </div>
                </div>

            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area" >
                    <ResumePreview resumeInfo={resumeInfo} />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume;