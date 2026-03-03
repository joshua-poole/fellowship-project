export default async function ViewPage({
  params,
}: {
  params: Promise<{ baseId: string; tableId: string; viewId: string }>;
}) {
  const { baseId, tableId, viewId } = await params;

  return (
    <div>
      <p>Base: {baseId}</p>
      <p>Table: {tableId}</p>
      <p>View: {viewId}</p>
    </div>
  );
}
