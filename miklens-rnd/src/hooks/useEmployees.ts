import { useEffect, useState } from 'react';
import { onSnapshot, type FirestoreError } from 'firebase/firestore';
import { employeesCollection } from '../services/db';
import type { Employee } from '../services/db';

export const useEmployees = () => {
  const [data, setData] = useState<Employee[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'mock-api-key') {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(employeesCollection, (snapshot) => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setError(null);
      setIsLoading(false);
    }, (err) => {
      console.error("Error fetching employees realtime:", err);
      setError(err);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { data, isLoading, error };
};
