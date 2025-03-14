"use client";

import { useRouter } from 'next/navigation';

interface QuestionNavigationProps {
  prev?: string;
  next: string;
}

export default function QuestionNavigation({ prev, next }: QuestionNavigationProps) {

  const router = useRouter();

  const handlePrev = () => { router.push(prev!); };
  const handleNext = () => { router.push(next); };

  return (
    <>
      {(prev != null) && <div>
        <button onClick={handlePrev}>Previous</button>
      </div>
      }
      {next && <div>
        <button onClick={handleNext}>Next</button>
      </div>
      }
    </>
  )

}