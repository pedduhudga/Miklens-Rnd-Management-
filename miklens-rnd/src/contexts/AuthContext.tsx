import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userRole: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Check if we manually set a mock user during a demo login
      if (user) {
         setCurrentUser(user);
         setUserRole('Admin');
      } else if (!user && sessionStorage.getItem('demo_mode') === 'true') {
         // Re-hydrate mock demo user
         setCurrentUser({ email: 'demo@miklensbio.com', uid: 'demo-123' } as User);
         setUserRole('Admin');
      } else {
         setCurrentUser(null);
         setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Expose a method to manually force demo mode
  const loginAsDemo = () => {
    sessionStorage.setItem('demo_mode', 'true');
    setCurrentUser({ email: 'demo@miklensbio.com', uid: 'demo-123' } as User);
    setUserRole('Admin');
  };

  return (
    <AuthContext.Provider value={{ currentUser, userRole, loading, loginAsDemo } as any}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
