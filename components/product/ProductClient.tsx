'use client';

import { useParams, useRouter } from 'next/navigation';

// components
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ProductColumn, columns } from './Columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

type ProductClientProps = {
  data: ProductColumn[];
};

export default function ProductClient({ data }: ProductClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='label' />
      <Heading title='API' description='API calls for Products' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  );
}