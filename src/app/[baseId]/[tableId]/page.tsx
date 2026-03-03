export default async function TablePage({
  params,
}: {
  params: Promise<{ baseId: string; tableId: string }>;
}) {
  const { baseId, tableId } = await params;

  return (
    <div>
      <p>Base: {baseId}</p>
      <p>Table: {tableId}</p>
    </div>
  );
}
