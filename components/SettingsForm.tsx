'use client';

import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Store } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

// components
import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type Props = {
  initialData: Store;
};

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ initialData }: Props) {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: SettingsFormValues) {
    console.log(values);
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage store preferences' />
        <Button variant='destructive' size='icon' onClick={() => {}}>
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
    </>
  );
}
