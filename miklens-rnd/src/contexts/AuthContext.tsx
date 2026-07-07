import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Roles are looked up from the `users/{uid}` Firestore document's `role` field.
// This must be kept in sync with firestore.rules, which trusts this same field
// for server-side authorization checks.
export type UserRole = 'Admin' | 'Manager' | 'Scientist' | 'Viewer';

const DEFAULT_ROLE: UserRole = 'Viewer';
const DEMO_USER_UID = 'demo-123';
const isMockConfig = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'mock-api-key';

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole | null;
  loading: boolean;
  loginAsDemo: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userRole: null,
  loading: true,
  loginAsDemo: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Looks up the caller's role from their Firestore user profile document.
// Falls back to the least-privileged role if the document is missing or
// the field is unset/invalid, rather than defaulting to Admin.
const fetchUserRole = async (uid: string): Promise<UserRole> => {
  try {
    const snapshot = await getDoc(doc(db, 'users', uid));
    const role = snapshot.data()?.role;
    if (role === 'Admin' || role === 'Manager' || role === 'Scientist' || role === 'Viewer') {
      return role;
    }
    return DEFAULT_ROLE;
  } catch (error) {
    console.error('Failed to fetch user role, defaulting to least privilege:', error);
    return DEFAULT_ROLE;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserRole(isMockConfig ? DEFAULT_ROLE : await fetchUserRole(user.uid));
      } else if (sessionStorage.getItem('demo_mode') === 'true') {
        // Re-hydrate the demo session. Demo access is explicitly scoped to
        // Admin for exploration purposes and never touches real auth/Firestore.
        setCurrentUser({ email: 'demo@miklensbio.com', uid: DEMO_USER_UID } as User);
        setUserRole('Admin');
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Expose a method to manually force demo mode. This is a client-only,
  // no-backend demo session and must never be treated as real authentication
  // (see ProtectedRoute / Firestore rules for the actual access boundary).
  const loginAsDemo = () => {
    sessionStorage.setItem('demo_mode', 'true');
    setCurrentUser({ email: 'demo@miklensbio.com', uid: DEMO_USER_UID } as User);
    setUserRole('Admin');
  };

  return (
    <AuthContext.Provider value={{ currentUser, userRole, loading, loginAsDemo }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
