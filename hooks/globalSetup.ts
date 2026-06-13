import { ensureAuthState } from '../auth/auth.setup';

export default async function globalSetup() {
  await ensureAuthState();
}