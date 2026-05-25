'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Checkbox from '@/components/ui/Checkbox';

const carrierSchema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  contact_name: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  dot_number: z.string().min(5, 'DOT number is required'),
  mc_number: z.string().min(5, 'MC number is required'),
  fleet_size: z.coerce.number().min(1, 'Fleet size is required'),
  equipment_types: z.array(z.string()).min(1, 'Select at least one equipment type'),
  insurance_provider: z.string().optional(),
  insurance_expiry: z.string().optional(),
  service_areas: z.string().optional(),
  _honey: z.string().max(0).optional(),
});

type CarrierFormValues = z.infer<typeof carrierSchema>;

const equipmentOptions = [
  'Dry Van', 'Flatbed', 'Refrigerated/Reefer', 'Step Deck',
  'RGN/Lowboy', 'Intermodal/Container', 'Tanker', 'Box Truck',
];

const fleetSizeOptions = [
  { value: '1', label: '1 (Owner Operator)' },
  { value: '2', label: '2–5 trucks' },
  { value: '6', label: '6–10 trucks' },
  { value: '11', label: '11–25 trucks' },
  { value: '26', label: '26–50 trucks' },
  { value: '51', label: '51+ trucks' },
];

export default function CarrierApplicationForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CarrierFormValues>({
    resolver: zodResolver(carrierSchema),
    defaultValues: { equipment_types: [] },
  });

  const selectedEquipment = watch('equipment_types') || [];

  const toggleEquipment = (type: string) => {
    const current = selectedEquipment;
    if (current.includes(type)) {
      setValue('equipment_types', current.filter((t) => t !== type));
    } else {
      setValue('equipment_types', [...current, type]);
    }
  };

  const onSubmit = async (data: CarrierFormValues) => {
    setError(null);
    if (data._honey) return;
    try {
      const res = await fetch('/api/carrier-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit application');
      setSuccess(true);
    } catch {
      setError('Failed to submit application. Please try again or call us.');
    }
  };

  if (success) {
    return (
      <Alert variant="success" title="Application Submitted!">
        Thank you for applying to join our carrier network. Our team will review your application and contact you within 2 business days.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <input type="text" {...register('_honey')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      {error && <Alert variant="error">{error}</Alert>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Company Name" required placeholder="ABC Trucking LLC" {...register('company_name')} error={errors.company_name?.message} />
        <Input label="Contact Name" required placeholder="John Smith" {...register('contact_name')} error={errors.contact_name?.message} />
        <Input label="Email Address" required type="email" placeholder="dispatch@trucking.com" {...register('email')} error={errors.email?.message} />
        <Input label="Phone Number" required type="tel" placeholder="(555) 000-0000" {...register('phone')} error={errors.phone?.message} />
        <Input label="DOT Number" required placeholder="1234567" {...register('dot_number')} error={errors.dot_number?.message} />
        <Input label="MC Number" required placeholder="MC-1234567" {...register('mc_number')} error={errors.mc_number?.message} />
        <Select
          label="Fleet Size"
          required
          options={fleetSizeOptions}
          placeholder="Select fleet size..."
          {...register('fleet_size')}
          error={errors.fleet_size?.message}
        />
        <Input label="Insurance Provider" placeholder="Progressive Commercial" {...register('insurance_provider')} />
      </div>

      <div>
        <Input label="Insurance Expiry Date" type="date" {...register('insurance_expiry')} />
      </div>

      {/* Equipment Types */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Equipment Types <span className="text-red-500">*</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {equipmentOptions.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleEquipment(type)}
              className={`text-xs px-3 py-2 rounded-lg border text-left transition-colors ${
                selectedEquipment.includes(type)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-dark-surface text-gray-700 dark:text-gray-300 border-gray-300 dark:border-dark-border hover:border-blue-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {errors.equipment_types && (
          <p className="mt-1 text-xs text-red-500">{errors.equipment_types.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Primary Service Areas
        </label>
        <textarea
          {...register('service_areas')}
          rows={2}
          placeholder="e.g. California, Nevada, Arizona, Pacific Northwest"
          className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 text-sm text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      <Button type="submit" size="lg" isLoading={isSubmitting}>
        Submit Application
      </Button>
    </form>
  );
}
