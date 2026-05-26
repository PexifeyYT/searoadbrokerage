'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  _honey: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setError(null);
    if (data._honey) return;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSuccess(true);
      reset();
    } catch {
      setError('Failed to send message. Please try again or call us directly.');
    }
  };

  if (success) {
    return (
      <Alert variant="success" title="Message Sent!">
        Thank you for reaching out. We will get back to you within 1 business day.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input type="text" {...register('_honey')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {error && <Alert variant="error">{error}</Alert>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name"
          required
          placeholder="John Smith"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Email Address"
          required
          type="email"
          placeholder="john@company.com"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="(555) 000-0000"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Input
          label="Subject"
          required
          placeholder="Freight inquiry"
          {...register('subject')}
          error={errors.subject?.message}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          {...register('message')}
          rows={5}
          placeholder="Tell us how we can help..."
          className="w-full rounded-lg border border-gray-300 dark:border-dark-border px-3 py-2 text-sm text-gray-900 dark:text-dark-text bg-white dark:bg-dark-surface placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
