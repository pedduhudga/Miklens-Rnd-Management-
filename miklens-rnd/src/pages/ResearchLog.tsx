import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';

const logSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  experimentId: z.string().min(1, 'Experiment is required'),
  objective: z.string().min(10, 'Objective must be at least 10 characters'),
  activities: z.string().min(10, 'Describe the activities performed'),
  problems: z.string().optional(),
  achievements: z.string().optional(),
  timeSpent: z.number().min(5, 'Minimum 5 minutes').max(600, 'Maximum 10 hours'),
  completionStatus: z.enum(['InProgress', 'Completed', 'Blocked']),
  confidenceLevel: z.number().min(1).max(100)
});

type LogFormValues = z.infer<typeof logSchema>;

export const ResearchLog: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LogFormValues>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      completionStatus: 'InProgress',
      confidenceLevel: 80,
      timeSpent: 60
    }
  });

  const onSubmit = async (data: LogFormValues) => {
    try {
      console.log('Submitting log to Firebase:', data);
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitStatus('success');
      reset();

      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Daily Research Log
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Complete this log in under 5 minutes. The AI engine will automatically generate reports and insights.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="flex items-center space-x-2 rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/50 dark:text-green-200">
          <CheckCircle2 className="h-5 w-5" />
          <span>Log successfully saved. AI analysis has begun.</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="flex items-center space-x-2 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">
          <AlertCircle className="h-5 w-5" />
          <span>Failed to save log. Please try again.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">

        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product</label>
            <div className="mt-1">
              <select {...register('productId')} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option value="">Select a product</option>
                <option value="p1">BioShield Alpha</option>
                <option value="p2">NemaKill Pro</option>
                <option value="p3">RootBoost X</option>
              </select>
              {errors.productId && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.productId.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experiment</label>
            <div className="mt-1">
              <select {...register('experimentId')} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option value="">Select an experiment</option>
                <option value="exp1">EXP-2023-089</option>
                <option value="exp2">EXP-2023-090</option>
              </select>
              {errors.experimentId && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.experimentId.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Today's Objective</label>
            <div className="mt-1">
              <input type="text" {...register('objective')} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
              {errors.objective && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.objective.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Activities Performed</label>
            <div className="mt-1">
              <textarea {...register('activities')} rows={3} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
              {errors.activities && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.activities.message}</p>}
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Problems Encountered (Optional)</label>
            <div className="mt-1">
              <textarea {...register('problems')} rows={2} placeholder="Scientific failures are valuable..." className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Achievements (Optional)</label>
            <div className="mt-1">
              <textarea {...register('achievements')} rows={2} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <div className="mt-1">
              <select {...register('completionStatus')} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-1 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time (mins)</label>
              <div className="mt-1">
                <input type="number" {...register('timeSpent', { valueAsNumber: true })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                {errors.timeSpent && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.timeSpent.message}</p>}
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confidence (%)</label>
              <div className="mt-1">
                <input type="number" {...register('confidenceLevel', { valueAsNumber: true })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                {errors.confidenceLevel && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.confidenceLevel.message}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Log'}
          </button>
        </div>
      </form>
    </div>
  );
};
