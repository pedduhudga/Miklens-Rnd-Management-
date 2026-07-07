import { useEffect, useState } from 'react';
import { onSnapshot, type FirestoreError } from 'firebase/firestore';
import { productsCollection } from '../services/db';
import type { Product } from '../services/db';

export const useProducts = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    // If not using real firebase, skip subscription
    if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'mock-api-key') {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setError(null);
      setIsLoading(false);
    }, (err) => {
      console.error("Error fetching products realtime:", err);
      setError(err);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { data, isLoading, error };
};
