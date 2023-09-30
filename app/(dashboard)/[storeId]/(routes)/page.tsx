import prismadb from '@/lib/prismadb';

type DashboardPageProps = {
  storeId: string;
};

export default async function DashboardPage({
  params,
}: {
  params: DashboardPageProps;
}) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>Active Store: {store?.name}</div>;
}
