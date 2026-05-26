'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

const quoteSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  company_name: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  origin_city: z.string().min(2, 'Origin city is required'),
  origin_state: z.string().min(2, 'Origin state is required'),
  destination_city: z.string().min(2, 'Destination city is required'),
  destination_state: z.string().min(2, 'Destination state is required'),
  shipment_type: z.enum(['FTL', 'LTL', 'Intermodal', 'Flatbed', 'Refrigerated', 'Specialized']),
  commodity: z.string().min(2, 'Commodity description is required'),
  weight_lbs: z.coerce.number().min(1, 'Weight is required').max(80000, 'Max weight is 80,000 lbs'),
  dimensions: z.string().optional(),
  pickup_date: z.string().min(1, 'Pickup date is required'),
  delivery_date: z.string().optional(),
  special_instructions: z.string().optional(),
  terms_accepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms to submit' }),
  }),
  _honey: z.string().max(0, 'Bot detected').optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const shipmentTypes = [
  { value: 'FTL', label: 'Full Truckload (FTL)' },
  { value: 'LTL', label: 'Less Than Truckload (LTL)' },
  { value: 'Intermodal', label: 'Intermodal' },
  { value: 'Flatbed', label: 'Flatbed' },
  { value: 'Refrigerated', label: 'Temperature Controlled (Reefer)' },
  { value: 'Specialized', label: 'Specialized / Hazmat' },
];

const usStates = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
  { value: 'BC', label: 'British Columbia (CA)' }, { value: 'ON', label: 'Ontario (CA)' },
];

interface QuoteFormProps {
  locale: string;
}

export default function QuoteForm({ locale }: QuoteFormProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setError(null);
    if (data._honey) return; // bot
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit quote');
      router.push(`/${locale}/quote/thank-you?ref=${json.quote_ref}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Honeypot */}
      <input type="text" {...register('_honey')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {error && <Alert variant="error">{error}</Alert>}

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            required
            placeholder="John Smith"
            {...register('full_name')}
            error={errors.full_name?.message}
          />
          <Input
            label="Company Name"
            placeholder="ACME Corp (optional)"
            {...register('company_name')}
            error={errors.company_name?.message}
          />
          <Input
            label="Email Address"
            required
            type="email"
            placeholder="john@company.com"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Phone Number"
            required
            type="tel"
            placeholder="(555) 000-0000"
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>
      </div>

      {/* Route */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipment Route</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Origin City"
            required
            placeholder="Los Angeles"
            {...register('origin_city')}
            error={errors.origin_city?.message}
          />
          <Select
            label="Origin State"
            required
            options={usStates}
            placeholder="Select state..."
            {...register('origin_state')}
            error={errors.origin_state?.message}
          />
          <Input
            label="Destination City"
            required
            placeholder="Chicago"
            {...register('destination_city')}
            error={errors.destination_city?.message}
          />
          <Select
            label="Destination State"
            required
            options={usStates}
            placeholder="Select state..."
            {...register('destination_state')}
            error={errors.destination_state?.message}
          />
        </div>
      </div>

      {/* Freight Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Freight Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Shipment Type"
            required
            options={shipmentTypes}
            placeholder="Select type..."
            {...register('shipment_type')}
            error={errors.shipment_type?.message}
          />
          <Input
            label="Commodity"
            required
            placeholder="e.g. Electronics, Auto Parts, Food"
            {...register('commodity')}
            error={errors.commodity?.message}
          />
          <Input
            label="Weight (lbs)"
            required
            type="number"
            placeholder="45000"
            {...register('weight_lbs')}
            error={errors.weight_lbs?.message}
          />
          <Input
            label="Dimensions (optional)"
            placeholder='e.g. 48" x 48" x 72"'
            {...register('dimensions')}
            error={errors.dimensions?.message}
          />
        </div>
      </div>

      {/* Dates */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Pickup Date"
            required
            type="date"
            {...register('pickup_date')}
            error={errors.pickup_date?.message}
          />
          <Input
            label="Delivery Date (optional)"
            type="date"
            {...register('delivery_date')}
            error={errors.delivery_date?.message}
          />
        </div>
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Special Instructions
        </label>
        <textarea
          {...register('special_instructions')}
          rows={3}
          placeholder="Any special handling, equipment requirements, or notes..."
          className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 text-sm text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        />
      </div>

      {/* Terms */}
      <Checkbox
        label={
          <span>
            I agree to the{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
              Privacy Policy
            </a>
            . I consent to Sea Road Brokerage INC contacting me about this quote request.
          </span>
        }
        {...register('terms_accepted')}
        error={errors.terms_accepted?.message}
      />

      <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
      </Button>
    </form>
  );
}
