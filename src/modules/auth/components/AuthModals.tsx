import { User } from '@supabase/supabase-js';
import { AuthModal } from '@/modules/auth/components/AuthModal';
import { OnboardingModal } from '@/modules/auth/components/OnboardingModal';
import { ProfileModal } from '@/modules/auth/components/ProfileModal';
import { CreateProfileData, UserProfile } from '@/modules/auth/types/auth.types';

interface AuthModalsProps {
  isAuthOpen: boolean;
  onCloseAuth: () => void;
  onGoogleSignIn: () => Promise<void>;
  authError: string | null;
  needsOnboarding: boolean;
  user: User | null;
  onCreateProfile: (data: CreateProfileData) => Promise<boolean>;
  isProfileOpen: boolean;
  onCloseProfile: () => void;
  profile: UserProfile | null;
  onSignOut: () => Promise<void>;
}

export function AuthModals({
  isAuthOpen,
  onCloseAuth,
  onGoogleSignIn,
  authError,
  needsOnboarding,
  user,
  onCreateProfile,
  isProfileOpen,
  onCloseProfile,
  profile,
  onSignOut,
}: AuthModalsProps) {
  return (
    <>
      <AuthModal
        isOpen={isAuthOpen}
        onClose={onCloseAuth}
        onGoogleSignIn={async () => {
          await onGoogleSignIn();
          onCloseAuth();
        }}
        error={authError}
      />

      <OnboardingModal isOpen={needsOnboarding} user={user} onSubmit={onCreateProfile} />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={onCloseProfile}
        user={user}
        profile={profile}
        onSignOut={onSignOut}
      />
    </>
  );
}
