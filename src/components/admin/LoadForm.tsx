'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import type { LoadFormData } from '@/types';

const loadSchema = z.object({
  origin_city: z.string().min(2, 'Origin city is required'),
  origin_state: z.string().min(2, 'Origin state is required'),
  destination_city: z.string().min(2, 'Destination city is required'),
  destination_state: z.string().min(2, 'Destination state is required'),
  equipment_type: z.enum(['Dry Van', 'Flatbed', 'Refrigerated', 'Step Deck', 'RGN', 'Intermodal', 'Tanker', 'Lowboy']),
  weight_lbs: z.coerce.number().min(1),
  commodity: z.string().min(2),
  pickup_date: z.string().min(1),
  delivery_date: z.string().min(1),
  rate: z.coerce.number().optional(),
  distance_miles: z.coerce.number().optional(),
  special_requirements: z.string().optional(),
  status: z.enum(['active', 'pending', 'covered', 'cancelled', 'delivered']),
  contact_name: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_email: z.string().optional(),
});

type LoadFormValues = z.infer<typeof loadSchema>;

const equipmentOptions = [
  { value: 'Dry Van', label: 'Dry Van' },
  { value: 'Flatbed', label: 'Flatbed' },
  { value: 'Refrigerated', label: 'Refrigerated' },
  { value: 'Step Deck', label: 'Step Deck' },
  { value: 'RGN', label: 'RGN' },
  { value: 'Intermodal', label: 'Intermodal' },
  { value: 'Tanker', label: 'Tanker' },
  { value: 'Lowboy', label: 'Lowboy' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'covered', label: 'Covered' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'delivered', label: 'Delivered' },
];

const stateOptions = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA',
  'ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK',
  'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','BC','ON',
].map((s) => ({ value: s, label: s }));

interface LoadFormProps {
  onSubmit: (data: Omit<LoadFormData, 'load_id'>) => Promise<void>;
  defaultValues?: Partial<LoadFormData>;
  isLoading?: boolean;
}

export default function LoadForm({ onSubmit, defaultValues, isLoading }: LoadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoadFormValues>({
    resolver: zodResolver(loadSchema),
    defaultValues: {
      status: 'active',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit as (data: LoadFormValues) => Promise<void>)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Origin City" required {...register('origin_city')} error={errors.origin_city?.message} />
        <Select label="Origin State" required options={stateOptions} placeholder="Select..." {...register('origin_state')} error={errors.origin_state?.message} />
        <Input label="Destination City" required {...register('destination_city')} error={errors.destination_city?.message} />
        <Select label="Destination State" required options={stateOptions} placeholder="Select..." {...register('destination_state')} error={errors.destination_state?.message} />
        <Select label="Equipment Type" required options={equipmentOptions} placeholder="Select..." {...register('equipment_type')} error={errors.equipment_type?.message} />
        <Input label="Commodity" required {...register('commodity')} error={errors.commodity?.message} />
        <Input label="Weight (lbs)" required type="number" {...register('weight_lbs')} error={errors.weight_lbs?.message} />
        <Input label="Rate ($)" type="number" {...register('rate')} error={errors.rate?.message} />
        <Input label="Pickup Date" required type="date" {...register('pickup_date')} error={errors.pickup_date?.message} />
        <Input label="Delivery Date" required type="date" {...register('delivery_date')} error={errors.delivery_date?.message} />
        <Input label="Distance (miles)" type="number" {...register('distance_miles')} />
        <Select label="Status" required options={statusOptions} {...register('status')} error={errors.status?.message} />
        <Input label="Contact Name" {...register('contact_name')} />
        <Input label="Contact Phone" {...register('contact_phone')} />
      </div>
      <Input label="Contact Email" type="email" {...register('contact_email')} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
        <textarea
          {...register('special_requirements')}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button type="submit" isLoading={isLoading} size="lg">
        Save Load
      </Button>
    </form>
  );
}
