import { ReviewProps } from "@/model/QuestionModel";

export default function StepReview({ data }: ReviewProps) {

  const InfoSection = ({
    items,
    title,
  }: {
    title: string;
    items: { label: string; value: string }[];
  }) => (
    <div className="space-y-3">
      <h3 className="text-large font-medium">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <span className="text-default-500">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Review</h2>
      </div>
      <InfoSection
        title="Attendance"
        items={[
          { label: "Attendance", value: data.attendanceReason || "--" }
        ]}
      />
      <InfoSection
        title="Personal"
        items={[
          { label: "First Name", value: data.firstName || "--" },
          { label: "Last Name", value: data.lastName || "--" },
          { label: "Date of Birth", value: data.dob || "--" },
          { label: "Sex", value: data.sex || "--" }
        ]}
      />
      <InfoSection
        title="Body"
        items={[
          { label: "Behaving Stragely", value: (data.behavingStrangely ? "Y" : "N") }
        ]}
      />
      <InfoSection
        title="Conditions"
        items={[
          { label: "Conditions", value: data.conditions.toString() || "--" }
        ]}
      />
      <InfoSection
        title="Pain"
        items={[
          { label: "Pain", value: data.pain?.toLocaleString() || "--" }
        ]}
      />
    </div>
  )
}