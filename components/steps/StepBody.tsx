import { TriageCondition } from "@/lib/data/TriageCondition";
import { TriageConditions } from "@/lib/data/TriageConditions";
import { StepProps } from "@/model/QuestionModel";
import { Card, Checkbox } from "@heroui/react";
import { on } from "events";
import { use, useEffect, useState } from "react";

export default function StepBody({ data, onChange }: StepProps) {

  const [presentingBodyComplaints, setPresentingBodyComplaints] = useState<string[]>(data.presentingComplaints || []);
  const [sourceConditions, setSourceConditions] = useState<TriageCondition[]>([]);

  useEffect(() => {

    const fetchConditions = async () => {
      const conditions = await TriageConditions.presentingComplaints();
      setSourceConditions(conditions);
    }

    fetchConditions();
  });

  const handleSelect = (id: string) => {

    // setPresentingBodyComplaints(prev => 
    //   prev.includes(id) 
    //     ? prev.filter(item => item !== id)
    //     : [...prev, id]
    // );

    const complaints: string[] =  (presentingBodyComplaints.includes(id)) ?
      presentingBodyComplaints.filter(item => item !== id) :
      [...presentingBodyComplaints, id];
      
    setPresentingBodyComplaints(prev => complaints);
    onChange("presentingComplaints", complaints);
    
  };

  return (
    <div className="flex flex-col gap-6">      
      <div className="container mx-auto p-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sourceConditions.map((item) => (
            <Card
              key={item.code}
              isPressable
              onPress={() => handleSelect(item.code)}
              className={`p-4 transition-colors ${
                presentingBodyComplaints.includes(item.code)
                  ? "bg-primary-100"
                  : "bg-content1 hover:bg-content2"
              }`}
            >
              <span className="text-lg">{item.condition}</span>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 text-default-500">
          Selected boxes: {presentingBodyComplaints?.length ? presentingBodyComplaints.join(", ") : "None"}
        </div>
      </Card>
    </div>


    </div>
  )
}