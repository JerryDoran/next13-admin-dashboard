import prismadb from '@/lib/prismadb';

// components
import CategoryForm from '@/components/category/CategoryForm';

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
