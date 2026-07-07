import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

const renderProtectedRoute = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Protected Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe('ProtectedRoute', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('shows a loading indicator while auth state is resolving', () => {
    mockedUseAuth.mockReturnValue({
      currentUser: null,
      userRole: null,
      loading: true,
      loginAsDemo: vi.fn(),
    });

    renderProtectedRoute();

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('redirects to /login when there is no authenticated user', () => {
    mockedUseAuth.mockReturnValue({
      currentUser: null,
      userRole: null,
      loading: false,
      loginAsDemo: vi.fn(),
    });

    renderProtectedRoute();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders the protected content when a user is authenticated', () => {
    mockedUseAuth.mockReturnValue({
      // @ts-expect-error - partial User mock is sufficient for this test
      currentUser: { uid: 'user-1', email: 'user@example.com' },
      userRole: 'Viewer',
      loading: false,
      loginAsDemo: vi.fn(),
    });

    renderProtectedRoute();

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
