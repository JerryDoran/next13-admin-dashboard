import ColorsClient from '@/components/color/ColorClient';
import { ColorColumn } from '@/components/color/Columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

type ColorsProps = {
  params: {
    storeId: string;
  };
};

export default async function ColorsPage({ params }: ColorsProps) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedColors: ColorColumn[] = colors.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
}
