import React, { useState, useEffect } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryform = ({ data, onChange, setresumeData }) => {

  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  // Keep internal text state so we always have the latest value
  // The prop `data` can be stale inside async callbacks (stale closure)
  // Using internal state + syncing with prop fixes this completely
  const [localText, setLocalText] = useState(data || '')

  // Sync if parent data changes (e.g. after AI enhance updates parent state)
  useEffect(() => {
    setLocalText(data || '')
  }, [data])

  const handleChange = (e) => {
    const val = e.target.value
    setLocalText(val)   // update local immediately
    onChange(val)       // bubble up to parent
  }

  const generateSummary = async () => {

    // Use localText — always fresh, no stale closure
    const textToEnhance = localText.trim()

    if (!textToEnhance) {
      toast.error('Please write something in the summary first')
      return
    }

    if (!token) {
      toast.error('Session expired — please log out and log in again')
      return
    }

    setIsGenerating(true)

    try {
      const { data: responseData } = await api.post(
        '/api/ai/enhance-pro-sum',
        { userContent: `enhance my professional summary: "${textToEnhance}"` },
        { headers: { Authorization: token } }
      )

      const enhanced = responseData?.enhanceContent

      if (!enhanced) {
        toast.error('AI returned empty response')
        return
      }

      // Update both local and parent state
      setLocalText(enhanced)
      onChange(enhanced)
      setresumeData(prev => ({ ...prev, professional_summary: enhanced }))
      toast.success('Summary enhanced!')

    } catch (error) {
      const status = error?.response?.status
      const msg = error?.response?.data?.message

      if (status === 400) {
        toast.error('Bad request — ' + (msg || 'summary text was rejected by server'))
      } else if (status === 401 || status === 403) {
        toast.error('Unauthorized — please log out and log in again')
      } else if (status === 500) {
        toast.error('Server error — check OpenAI API key in backend env vars')
      } else {
        toast.error(msg || error.message || 'Something went wrong')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>Professional Summary</h3>
          <p className='text-sm text-gray-500'>Add summary for your resume here</p>
        </div>
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isGenerating
            ? <Loader2 className='size-4 animate-spin' />
            : <Sparkles className='size-4' />
          }
          {isGenerating ? 'Enhancing...' : 'AI Enhance'}
        </button>
      </div>

      <div className='mt-6'>
        <textarea
          value={localText}
          onChange={handleChange}
          rows={7}
          className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'
          placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
        />
        <p className='text-xs text-gray-500 text-center mt-1'>
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
        </p>
      </div>
    </div>
  )
}

export default ProfessionalSummaryform