import { z } from 'zod';

export const onboardingSchema = z
  .object({
    // Step 1 — Company Info
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    registrationNumber: z.string().min(1, 'Registration number is required'),
    companyEmail: z.string().email('Enter a valid email address'),
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    address: z.string().min(5, 'Address must be at least 5 characters'),

    // Step 2 — Business Details
    transportType: z.string().min(1, 'Please select a transport type'),
    numberOfBuses: z.coerce
      .number({ invalid_type_error: 'Must be a number' })
      .int('Must be a whole number')
      .min(1, 'Must have at least 1 bus'),
    routes: z
      .array(z.string().min(1, 'Route cannot be empty'))
      .min(1, 'Add at least one route'),
    yearsOfOperation: z.coerce
      .number({ invalid_type_error: 'Must be a number' })
      .min(0, 'Cannot be negative'),

    // Step 3 — Admin Account
    adminFullName: z.string().min(2, 'Full name must be at least 2 characters'),
    adminEmail: z.string().email('Enter a valid email address'),
    adminPassword: z.string().min(6, 'Password must be at least 6 characters'),
    adminConfirmPassword: z.string().min(1, 'Please confirm your password'),

    // Step 5 — Agreement
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: 'You must accept the terms and conditions',
    }),
    acceptCommission: z.boolean().refine((v) => v === true, {
      message: 'You must agree to the commission structure',
    }),
  })
  .refine((d) => d.adminPassword === d.adminConfirmPassword, {
    message: 'Passwords do not match',
    path: ['adminConfirmPassword'],
  });

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

export const STEP_FIELDS: Record<number, (keyof OnboardingFormData)[]> = {
  0: ['companyName', 'registrationNumber', 'companyEmail', 'phone', 'address'],
  1: ['transportType', 'numberOfBuses', 'routes', 'yearsOfOperation'],
  2: ['adminFullName', 'adminEmail', 'adminPassword', 'adminConfirmPassword'],
  3: [],
  4: ['acceptTerms', 'acceptCommission'],
  5: [],
};

export const STEP_LABELS = [
  'Company Info',
  'Business Details',
  'Admin Account',
  'Documents',
  'Agreement',
  'Review & Submit',
];

export type UploadedFiles = {
  businessCertificate: File | null;
  transportLicense: File | null;
  companyLogo: File | null;
};
