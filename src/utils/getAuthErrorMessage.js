const MESSAGES = {
  'auth/email-already-in-use': 'This email is already registered',
  'auth/invalid-email': 'Invalid email address',
  'auth/invalid-credential': 'Wrong email or password',
  'auth/user-not-found': 'Wrong email or password',
  'auth/wrong-password': 'Wrong email or password',
  'auth/weak-password': 'Password is too weak',
  'auth/too-many-requests': 'Too many attempts, please try again later',
  'auth/network-request-failed': 'Network error, please try again',
};

export const getAuthErrorMessage = error =>
  MESSAGES[error?.code] ?? 'Something went wrong, please try again';
