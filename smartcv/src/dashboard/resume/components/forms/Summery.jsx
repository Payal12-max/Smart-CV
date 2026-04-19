
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { AIChatSession } from './../../../../../service/AIModal';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const prompt = `
Job Title: {jobTitle}

Generate resume summaries for 3 experience levels:
- Fresher
- Mid Level
- Senior Level

Each summary should be 3–4 lines.

Return ONLY valid JSON in this format:
{
  "summaries": [
    {
      "experience_level": "Fresher",
      "summary": ""
    },
    {
      "experience_level": "Mid Level",
      "summary": ""
    },
    {
      "experience_level": "Senior Level",
      "summary": ""
    }
  ]
}
` ;
function Summery({ enabledNext }) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState("");
    const [loading, setLoading] = useState("");
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            summery: summery
        });
    }, [summery])

    const GenerateSummeryFromAI = async () => {
        setLoading(true);

        try {
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
            console.log(PROMPT);

            const result = await AIChatSession.sendMessage(PROMPT);

            let text = result.response.text();

            // remove markdown formatting if any
            text = text.replace(/```json|```/g, "");

            const parsed = JSON.parse(text);

            setAiGenerateSummeryList(parsed?.summaries || []);
        } catch (error) {
            console.log("AI ERROR:", error);
            toast("Failed to generate AI summary");
        }

        setLoading(false);
    };

    const onSave = (e) => {
        e.preventDefault();

        setLoading(true)
        
        const data = {
                summery: summery
        };
        console.log("PARAMS:", params);
        console.log("FINAL PAYLOAD:", data);
        GlobalApi.UpdateResumeDetail(params?.id, data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details updated");
        })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };
    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summery</h2>
                <p>Add Summery for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summery</label>
                        <Button variant="outline" onClick={() => GenerateSummeryFromAI()}
                            type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' />  Generate from AI</Button>
                    </div>
                    <Textarea
                        className="mt-5"
                        required
                        value={summery || resumeInfo?.summery || ""}
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit"
                            disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>


            {aiGeneratedSummeryList && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummeryList?.map((item, index) => (
                    <div key={index}
                        onClick={() => setSummery(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>}

        </div>
    )
}

export default Summery
