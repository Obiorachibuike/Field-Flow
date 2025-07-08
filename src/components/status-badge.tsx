import { Badge } from '@/components/ui/badge';
import type { PackageStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: PackageStatus;
  className?: string;
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusStyles: Record<PackageStatus, string> = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800/50',
    'In Transit': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800/50',
    Delivered: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800/50',
    Failed: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800/50',
  };

  return (
    <Badge
      className={cn('font-semibold', statusStyles[status], className)}
      variant="outline"
    >
      {status}
    </Badge>
  );
}
