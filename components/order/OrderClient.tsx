'use client';

import { useParams, useRouter } from 'next/navigation';

// components
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { OrderColumn, columns } from './Columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

type OrderClientProps = {
  data: OrderColumn[];
};

export default function OrderClient({ data }: OrderClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey='products' />
    </>
  );
}
