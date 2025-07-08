export type Recipient = {
  name: string;
  phone: string;
  address: string;
};

export type PackageStatus = 'Pending' | 'In Transit' | 'Delivered' | 'Failed';

export type Package = {
  id: string;
  trackingId: string;
  recipient: Recipient;
  status: PackageStatus;
  weight: string;
  type: string;
};
