'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MainHeader } from '@/components/main-header';
import packages from '@/data/packages.json';
import type { Package, PackageStatus } from '@/lib/types';
import { updatePackageStatus } from '@/app/actions';

const FormSchema = z.object({
  status: z.enum(['Pending', 'In Transit', 'Delivered', 'Failed'], {
    required_error: 'Please select a status.',
  }),
});

export default function UpdateStatusPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params.id as string;
  const pkg = (packages as Package[]).find((p) => p.id === id);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: pkg?.status,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await updatePackageStatus(id, data.status);
    if (result.success) {
      toast({
        title: 'Status Updated',
        description: `Package ${pkg?.trackingId} status changed to ${data.status}.`,
      });
      router.push(`/package/${id}`);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update status.',
        variant: 'destructive',
      });
    }
  }

  if (!pkg) {
    notFound();
  }

  return (
    <>
      <MainHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-scaling:text-3xl md:font-scaling:text-4xl">Update Status</CardTitle>
              <CardDescription className="font-scaling:text-lg">
                Change the status for package{' '}
                <span className="font-semibold text-primary">{pkg.trackingId}</span>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-scaling:text-base">Package Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="font-scaling:text-base">
                              <SelectValue placeholder="Select a new status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(['Pending', 'In Transit', 'Delivered', 'Failed'] as PackageStatus[]).map(
                              (status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full font-scaling:text-base">
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
