import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './AuthContext';

// Capture the onAuthStateChanged callback so tests can simulate auth events.
let authStateCallback: ((user: unknown) => void) | undefined;

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: (_auth: unknown, callback: (user: unknown) => void) => {
    authStateCallback = callback;
    return vi.fn(); // unsubscribe
  },
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
}));

vi.mock('../config/firebase', () => ({
  auth: {},
  db: {},
}));

const Consumer = () => {
  const { currentUser, userRole, loading, loginAsDemo } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div data-testid="email">{currentUser?.email ?? 'no-user'}</div>
      <div data-testid="role">{userRole ?? 'no-role'}</div>
      <button onClick={loginAsDemo}>Login as Demo</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    sessionStorage.clear();
    authStateCallback = undefined;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows no user and no role when signed out and not in demo mode', async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await act(async () => {
      authStateCallback?.(null);
    });

    await waitFor(() => {
      expect(screen.getByTestId('email')).toHaveTextContent('no-user');
    });
    expect(screen.getByTestId('role')).toHaveTextContent('no-role');
  });

  it('grants Admin access via loginAsDemo without touching real auth/Firestore', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await act(async () => {
      authStateCallback?.(null);
    });

    await user.click(screen.getByText('Login as Demo'));

    expect(screen.getByTestId('email')).toHaveTextContent('demo@miklensbio.com');
    expect(screen.getByTestId('role')).toHaveTextContent('Admin');
    expect(sessionStorage.getItem('demo_mode')).toBe('true');
  });

  it('re-hydrates the demo session on remount when demo_mode was previously set', async () => {
    sessionStorage.setItem('demo_mode', 'true');

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await act(async () => {
      authStateCallback?.(null);
    });

    await waitFor(() => {
      expect(screen.getByTestId('role')).toHaveTextContent('Admin');
    });
    expect(screen.getByTestId('email')).toHaveTextContent('demo@miklensbio.com');
  });
});
