import prismadb from '@/lib/prismadb';

export async function getTotalRevenue(storeId: string) {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // iterate over all orders
  const totalRevenue = paidOrders.reduce((total, order) => {
    // iterate over all order items
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
}
