import { useQuery } from '@tanstack/react-query';
import { getDocs } from 'firebase/firestore';
import { employeesCollection } from '../services/db';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const snapshot = await getDocs(employeesCollection);
      if (snapshot.empty) {
         // Return empty array if no data exists yet. The component will handle fallback.
         return [];
      }
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    // We disable this during development if no real config is present,
    // but the hook architecture is correct.
    enabled: import.meta.env.VITE_FIREBASE_API_KEY !== 'mock-api-key',
  });
};
