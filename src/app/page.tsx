import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MainHeader } from '@/components/main-header';
import StatusBadge from '@/components/status-badge';
import packages from '@/data/packages.json';
import type { Package } from '@/lib/types';

export default function DashboardPage() {
  const packageList = packages as Package[];

  return (
    <>
      <MainHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-scaling:text-3xl md:font-scaling:text-4xl">
            Dashboard
          </h1>
          <p className="text-muted-foreground font-scaling:text-lg">
            Overview of all packages.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packageList.map((pkg) => (
            <Link href={`/package/${pkg.id}`} key={pkg.id} className="block hover:shadow-lg transition-shadow rounded-lg">
              <Card className="h-full transition-all hover:border-primary">
                <CardHeader>
                  <CardTitle className="tracking-tighter text-lg md:text-xl font-scaling:text-xl md:font-scaling:text-2xl">
                    {pkg.trackingId}
                  </CardTitle>
                  <CardDescription className="font-scaling:text-base">
                    {pkg.recipient.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StatusBadge status={pkg.status} />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
