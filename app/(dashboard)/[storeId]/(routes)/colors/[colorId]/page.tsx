import prismadb from '@/lib/prismadb';

// components
import ColorForm from '@/components/color/ColorForm';

export default async function ColorPage({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}