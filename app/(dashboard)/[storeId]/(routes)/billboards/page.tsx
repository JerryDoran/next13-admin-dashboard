import BillboardClient from '@/components/billboard/BillboardClient';
import { BillboardColumn } from '@/components/billboard/Columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';

type BillboardProps = {
  params: {
    storeId: string;
  };
};

export default async function BillboardsPage({ params }: BillboardProps) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, 'MMMM do, yyyy'),
    })
  );

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
