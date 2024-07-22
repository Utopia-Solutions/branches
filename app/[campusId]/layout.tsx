import Header from "@/components/header";

export default function Layout({
  children,
  params: { campusId },
}: {
  children: React.ReactNode;
  params: { campusId: string };
}) {
  return (
    <>
      <Header selectedCampusId={Number(campusId)} />
      {children}
    </>
  );
}
