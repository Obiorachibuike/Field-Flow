'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MainHeader } from '@/components/main-header';
import StatusBadge from '@/components/status-badge';
import { Phone, User, Home, Weight, Box, Edit, CheckCircle } from 'lucide-react';
import packages from '@/data/packages.json';
import type { Package } from '@/lib/types';

export default function PackageDetailsPage() {
  const params = useParams();
  const { toast } = useToast();
  const id = params.id as string;
  const pkg = (packages as Package[]).find((p) => p.id === id);

  if (!pkg) {
    notFound();
  }

  const handleMarkAsDelivered = () => {
    toast({
      title: 'Success',
      description: `Package ${pkg.trackingId} marked as delivered.`,
      variant: 'default',
    });
  };

  return (
    <>
      <MainHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-primary">{pkg.trackingId}</h1>
              <p className="text-muted-foreground text-lg">Package Details</p>
            </div>
            <StatusBadge status={pkg.status} className="text-base px-4 py-1" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="w-5 h-5 text-primary" /> Recipient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-base">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{pkg.recipient.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${pkg.recipient.phone}`} className="text-primary hover:underline">
                    {pkg.recipient.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="w-4 h-4 mt-1 text-muted-foreground" />
                  <span>{pkg.recipient.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Box className="w-5 h-5 text-primary" /> Package Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-base">
                <div className="flex items-center gap-3">
                  <Weight className="w-4 h-4 text-muted-foreground" />
                  <span>Weight: {pkg.weight}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Box className="w-4 h-4 text-muted-foreground" />
                  <span>Type: {pkg.type}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link href={`/package/${pkg.id}/update`}>
                <Edit className="mr-2 h-4 w-4" /> Update Status
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleMarkAsDelivered}>
              <CheckCircle className="mr-2 h-4 w-4" /> Mark as Delivered
            </Button>
            <Button variant="secondary" className="flex-1" asChild>
              <a href={`tel:${pkg.recipient.phone}`}>
                <Phone className="mr-2 h-4 w-4" /> Contact Recipient
              </a>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
