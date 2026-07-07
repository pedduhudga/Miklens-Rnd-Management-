import { useQuery } from '@tanstack/react-query';
import { getDocs } from 'firebase/firestore';
import { productsCollection } from '../services/db';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const snapshot = await getDocs(productsCollection);
      if (snapshot.empty) {
         return [];
      }
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    enabled: import.meta.env.VITE_FIREBASE_API_KEY !== 'mock-api-key',
  });
};
