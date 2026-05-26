import type { Metadata } from 'next';
import LoadBoardClient from './LoadBoardClient';

export const metadata: Metadata = {
  title: 'Available Loads',
  description: 'Browse available freight loads posted by Sea Road Brokerage INC. Filter by equipment type, origin, destination, and pickup date. Live updates.',
};

export default function LoadBoardPage() {
  return <LoadBoardClient />;
}
