import { UserButton, auth } from '@clerk/nextjs';
import Nav from './Nav';
import StoreSwitcher from '@/components/StoreSwitcher';
import ModeToggle from '@/components/ThemeToggle';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';

export default async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <header className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />
        <Nav className='px-6 pt-1' />
        <div className='ml-auto flex items-center space-x-4'>
          <ModeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </header>
  );
}
