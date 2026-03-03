export default async function BasePage({
  params,
}: {
  params: Promise<{ baseId: string }>;
}) {
  const { baseId } = await params;

  return (
    <div>
      <p>Base: {baseId}</p>
    </div>
  );
}
