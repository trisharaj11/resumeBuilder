// import {
//   FilePenLineIcon,
//   Loader,
//   LoaderCircleIcon,
//   PencilIcon,
//   PlusIcon,
//   TrashIcon,
//   UploadCloud,
//   UploadCloudIcon,
//   XIcon
// } from 'lucide-react'
// import { useEffect, useState } from 'react'
// import { dummyResumeData } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import api from '../configs/api'
// import toast from 'react-hot-toast'
// import pdfToText from 'react-pdftotext'

// const Dashboard = () => {
  
//   const {user,token}=useSelector(state=>state.auth)

//   const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
//   const [allResumes, setAllResumes] = useState([])
//   const [showCreateResume, setShowCreateResume] = useState(false)
//   const [showUploadResume, setShowUploadResume] = useState(false)
//   const [title, setTitle] = useState('') 
//   const [resume, setResume] = useState(null)
//   const [editResumeId, setEditResumeId] = useState('') 

//   const[isLoading,setIsLoading]=useState(false)
  
//   const navigate=useNavigate()

//   const loadAllResumes = async () => {
//     try {
//        const {data}=await api.get('/api/users/resumes',{headers:{Authorization:token}})
//        setAllResumes(data.resumes)
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message)
//     }
//   }

//   const createResume=async(event)=>{
//    try {
//     event.preventDefault()
//     const {data}=await api.post('/api/resumes/create',{title},{headers:{Authorization:token}})
//     setAllResumes([...allResumes, data?.data?.resume])
//     setTitle('')
//     setShowCreateResume(false)
//     navigate(`/app/builder/${data.resume._id}`)
//    } catch (error) {
//      toast.error(error?.response?.data?.message || error.message)
//    }
//   }

//   const uploadResume=async(event)=>{
//     event.preventDefault()
//     setIsLoading(true)
//     try {
//       const resumeText=await pdfToText(resume)
//        const {data}=await api.post('/api/ai/upload-resume',{title,resumeText},{headers:{Authorization:token}})
//        setTitle('')
//        setResume(null)
//        setShowUploadResume(false)
//        navigate(`/app/builder/${data.resumeId}`)
//     } catch (error) {
//        toast.error(error?.response?.data?.message || error.message)

//     }
//     setIsLoading(false)
    
    
//   }

//   const edittitle=async(event)=>{
//     try {
//       event.preventDefault()
//      const formData = new FormData()
//      formData.append("resumeId", editResumeId)
//      formData.append("resumeData", JSON.stringify({ title }))

//    await api.put('/api/resumes/update/', formData, {
//    headers: {
//     Authorization: token,
//     "Content-Type": "multipart/form-data"
//   }
// })
//       setAllResumes(allResumes.map(resume=>resume._id === editResumeId ? {...resume,title}:resume))
//       setTitle('')
//       setEditResumeId('')
//       toast.success(data.message)
//     } catch (error) {
//        toast.error(error?.response?.data?.message || error.message)
//     }
//   }

//   const deleteResume=async(resumeId)=>{
//    try {
//     const confirm=window.confirm('Are you sure you want to delete?')
//     if(confirm){
//        const {data}=await api.delete(`/api/resumes/delete/${resumeId}`,{headers:{Authorization:token}})
//        setAllResumes(allResumes.filter(resume=>resume._id!==resumeId))
//        toast.success(data.message)
//     }
//    } catch (error) {
//     toast.error(error?.response?.data?.message || error.message)
//    }
//   }

//   useEffect(() => {
//     loadAllResumes()
//   }, [])

//   return (
//     <div>
//       <div className="max-w-7xl mx-auto px-4 py-8">

//         <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
//           Welcome, John Doe
//         </p>

//         {/* CREATE / UPLOAD */}
//         <div className="flex gap-4">
//           <button onClick={()=>setShowCreateResume(true)}
//             className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2
//             border group hover:shadow-lg transition duration-300 cursor-pointer"
//             style={{
//               background: "linear-gradient(135deg, #6366f110, #6366f140)",
//               borderColor: "#6366f140"
//             }}
//           >
//             <PlusIcon
//               className="size-11 p-2.5 rounded-full text-white"
//               style={{ background: "linear-gradient(135deg, #818cf8, #6366f1)" }}
//             />
//             <p className="text-sm text-indigo-600">Create Resume</p>
//           </button>

//           <button onClick={()=>setShowUploadResume(true)}
//             className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2
//             border group hover:shadow-lg transition duration-300 cursor-pointer"
//             style={{
//               background: "linear-gradient(135deg, #a855f710, #a855f740)",
//               borderColor: "#a855f740"
//             }}
//           >
//             <UploadCloudIcon
//               className="size-11 p-2.5 rounded-full text-white"
//               style={{ background: "linear-gradient(135deg, #c084fc, #a855f7)" }}
//             />
//             <p className="text-sm text-purple-600">Upload Existing</p>
//           </button>
//         </div>

//         <hr className="border-slate-300 my-6 sm:w-[305px]" />

//         {/* RESUMES */}
//         <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
//           {allResumes.map((resume, index) => {
//             if (!resume) return null //--
//             const basecolor = colors[index % colors.length]

//             return (
//               <button
//                 key={index}
//                 onClick={()=>navigate(`/app/builder/${resume._id}`)}
//                 className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2
//                 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
//                 style={{
//                   background: `linear-gradient(135deg, ${basecolor}10, ${basecolor}40)`,
//                   borderColor: basecolor + '40'
//                 }}
//               >
//                 <FilePenLineIcon
//                   className="size-7 group-hover:scale-105 transition-all px-2"
//                   style={{ color: basecolor }}
//                 />
               
//                <p>{resume?.title || "Untitled"}</p> 

//                 <p
//                   className="absolute bottom-1 text-[11px] transition-all duration-300 px-2 text-center"
//                   style={{ color: basecolor + '90' }}
//                 >
//                   Updated on {new Date(resume?.updatedAt || Date.now()).toLocaleDateString()}
//                 </p>

//                 <div onClick={e=>e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
//                   <TrashIcon onClick={()=>deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
//                   <PencilIcon onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
//                 </div>
//               </button>
//             )
//           })}
//         </div>
//         {showCreateResume && (
//           <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
//             <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
//               <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
//               <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter Resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />
//               <button className='w-full py-2 bg-green-600 text-white rounded
//                hover:bg-green-700 transition-colors'>Create Resume</button>
//                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setShowCreateResume(false); setTitle('')}}/>
//             </div>

//           </form>
//         )}
        
//         {showUploadResume && (
//            <form onSubmit={uploadResume} onClick={()=>setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
//             <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
//               <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
//               <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter Resume title' 
//               className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />
              
//               <div>
//                 <label htmlFor="resume-input" className='block text-sm text-slate-700'>
//                  Select resume File
//                  <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500
//                   hover:text-green-700 cursor-pointer transition-colors'>

//                     {
//                       resume ? (
//                         <p className='text-green-700'>{resume.name}</p>
//                       ) :(
//                         <>
//                         <UploadCloud className='size-14 stroke-1'/>
//                         <p>Upload resume</p>
//                         </>
//                       )
//                     }

//                  </div>

//                 </label>
//                 <input type="file" id='resume-input' accept='.pdf' hidden
//                 onChange={(e)=>setResume(e.target.files[0])}/>
//               </div>

//               <button disabled={isLoading} className='w-full py-2 bg-green-600 text-white rounded
//                hover:bg-green-700 transition-colors flex items-center justify-center gap-2'>
//                 {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
//                 {isLoading ? 'Uploading...' : 'Upload Resume'}
//                 Upload Resume</button>
//                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setShowUploadResume(false); setTitle('')}}/>
//             </div>

//           </form>
//         )
//         }

//         {editResumeId && (
//           <form onSubmit={edittitle} onClick={()=>setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
//             <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
//               <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
//               <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter Resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required />
//               <button className='w-full py-2 bg-green-600 text-white rounded
//                hover:bg-green-700 transition-colors'>Create Resume</button>
//                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setEditResumeId(''); setTitle('')}}/>
//             </div>

//           </form>
//         )}

//       </div>
//     </div>
//   )
// }

// export default Dashboard
import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data?.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const edittitle = async (event) => {
    try {
      event.preventDefault()
      const formData = new FormData()
      formData.append("resumeId", editResumeId)
      formData.append("resumeData", JSON.stringify({ title }))

      const { data } = await api.put('/api/resumes/update/', formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      })
      setAllResumes(allResumes.map(r => r._id === editResumeId ? { ...r, title } : r))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete?')
      if (confirmed) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(r => r._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, {user?.name || 'User'}
        </p>

        {/* CREATE / UPLOAD */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition duration-300 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #6366f110, #6366f140)", borderColor: "#6366f140" }}
          >
            <PlusIcon
              className="size-11 p-2.5 rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #818cf8, #6366f1)" }}
            />
            <p className="text-sm text-indigo-600">Create Resume</p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition duration-300 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #a855f710, #a855f740)", borderColor: "#a855f740" }}
          >
            <UploadCloudIcon
              className="size-11 p-2.5 rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #c084fc, #a855f7)" }}
            />
            <p className="text-sm text-purple-600">Upload Existing</p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* RESUMES GRID */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            if (!resume) return null
            const basecolor = colors[index % colors.length]
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${basecolor}10, ${basecolor}40)`,
                  borderColor: basecolor + '40'
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: basecolor }}
                />
                <p className="text-sm text-center px-2">{resume?.title || "Untitled"}</p>
                <p
                  className="absolute bottom-1 text-[11px] px-2 text-center"
                  style={{ color: basecolor + '90' }}
                >
                  Updated on {new Date(resume?.updatedAt || Date.now()).toLocaleDateString()}
                </p>
                <div
                  onClick={e => e.stopPropagation()}
                  className="absolute top-1 right-1 hidden group-hover:flex items-center"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            )
          })}
        </div>

        {/* CREATE RESUME MODAL */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                onChange={e => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume title"
                className="w-full px-4 py-2 mb-4"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => { setShowCreateResume(false); setTitle('') }}
              />
            </div>
          </form>
        )}

        {/* UPLOAD RESUME MODAL */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
              <input
                onChange={e => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume title"
                className="w-full px-4 py-2 mb-4"
                required
              />
              <label htmlFor="resume-input" className="block text-sm text-slate-700">
                Select resume file
                <div className="flex flex-col items-center justify-center gap-2 border border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors text-slate-400">
                  {resume ? (
                    <p className="text-green-700">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="size-14 stroke-1" />
                      <p>Upload resume</p>
                    </>
                  )}
                </div>
              </label>
              <input type="file" id="resume-input" accept=".pdf" hidden onChange={e => setResume(e.target.files[0])} />
              <button
                disabled={isLoading}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white" />}
                {isLoading ? 'Uploading...' : 'Upload Resume'}
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => { setShowUploadResume(false); setTitle('') }}
              />
            </div>
          </form>
        )}

        {/* EDIT TITLE MODAL */}
        {editResumeId && (
          <form
            onSubmit={edittitle}
            onClick={() => setEditResumeId('')}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                onChange={e => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume title"
                className="w-full px-4 py-2 mb-4"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Save Title
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => { setEditResumeId(''); setTitle('') }}
              />
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard