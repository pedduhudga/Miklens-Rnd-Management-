import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { employeesCollection } from '../services/db';
import type { Employee } from '../services/db';

export const useEmployees = () => {
  const [data, setData] = useState<Employee[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'mock-api-key') {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(employeesCollection, (snapshot) => {
      if (snapshot.empty) {
        setData([]);
      } else {
        setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching employees realtime:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { data, isLoading };
};
