import ProductClient from '@/components/product/ProductClient';
import { ProductColumn } from '@/components/product/Columns';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';

type ProductProps = {
  params: {
    storeId: string;
  };
};

export default async function ProductsPage({ params }: ProductProps) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
