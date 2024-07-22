export default function ItineraryAttendancePage({
  params: { campusId, childId },
}: {
  params: { campusId: string; childId: string };
}) {
  return (
    <div>
      <h1>ItineraryAttendancePage</h1>
      <p>campusId: {campusId}</p>
      <p>childId: {childId}</p>
    </div>
  );
}
