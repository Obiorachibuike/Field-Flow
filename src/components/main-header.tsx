import Link from 'next/link';
import { Package, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold">FieldFlow</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings" aria-label="Settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
