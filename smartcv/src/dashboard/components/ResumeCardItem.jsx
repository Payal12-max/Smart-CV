
import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {

  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const resumeId = resume.documentId;
  // const onMenuClick=(url)=>{
  //   navigation(url)
  // }


  const onDelete = () => {
    setLoading(true);

    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      console.log(resp);
      toast('Resume Deleted!');
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
    })
  }
  return (

    <div className=''>
      <Link to={`/dashboard/resume/${resumeId}/edit`}>
        <div className='p-6 h-[280px] flex flex-col justify-center items-center bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 rounded-t-lg border-t-4'
          style={{
            borderColor: resume?.themeColor
          }}
        >
          <div className='flex 
        items-center justify-center h-[180px] '>
            {/* <Notebook/> */}
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-2">

        <h2 className="text-sm font-medium">
          {resume.title}
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className='h-4 w-4 cursor-pointer text-gray-500 hover:text-black' />
          </DropdownMenuTrigger>

          <DropdownMenuContent>

            <DropdownMenuItem onClick={() => navigation(`/dashboard/resume/${resumeId}/edit`)}>
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigation(`/my-resume/${resumeId}/view`)}>
              View
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigation(`/my-resume/${resumeId}/view`)}>
              Download
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}
              disabled={loading}>
              {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

export default ResumeCardItem
