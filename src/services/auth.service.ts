import type { User } from '@/models/user.model';

interface StoredAccount {
  user: User;
  passwordHash: string;
  salt: string;
}

const ACCOUNTS_KEY = 'flora_accounts';

// Nalozi se čuvaju lokalno samo u "local storage" nema serverske autentifikacije.
const getAccounts = (): StoredAccount[] => {
  const storedAccounts = localStorage.getItem(ACCOUNTS_KEY);
  return storedAccounts ? JSON.parse(storedAccounts) as StoredAccount[] : [];
};

const hashPassword = async (password: string, salt: Uint8Array<ArrayBuffer>): Promise<string> => {
  //ovo za Heširanje sam hteo da testiram samo nesto 
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 310_000, hash: 'SHA-256' },
    key,
    256
  );
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
};

const encodeSalt = (salt: Uint8Array<ArrayBuffer>): string =>
  Array.from(salt, byte => byte.toString(16).padStart(2, '0')).join('');

const decodeSalt = (salt: string): Uint8Array<ArrayBuffer> =>
  new Uint8Array(salt.match(/.{2}/g)?.map(byte => Number.parseInt(byte, 16)) ?? []);

export const meetsPasswordRequirements = (password: string): boolean =>
  password.length >= 7 && /[A-ZČĆŠĐŽ]/.test(password) && /\d/.test(password);

export const registerAccount = async (user: User, password: string): Promise<boolean> => {
  const accounts = getAccounts();
  const email = user.email.trim().toLowerCase();

  if (accounts.some(account => account.user.email.toLowerCase() === email)) {
    return false;
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  accounts.push({
    user: { ...user, email },
    passwordHash: await hashPassword(password, salt),
    salt: encodeSalt(salt)
  });
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  return true;
};

export const authenticateAccount = async (
  email: string,
  password: string
): Promise<User | null> => {
  const account = getAccounts().find(
    candidate => candidate.user.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!account) {
    return null;
  }

  const passwordHash = await hashPassword(password, decodeSalt(account.salt));
  return passwordHash === account.passwordHash ? account.user : null;
};

export const updateAccountProfile = (currentEmail: string, user: User): boolean => {
  const accounts = getAccounts();
  const currentAccount = accounts.find(
    account => account.user.email.toLowerCase() === currentEmail.trim().toLowerCase()
  );
  const email = user.email.trim().toLowerCase();

  if (!currentAccount || accounts.some(
    account => account !== currentAccount && account.user.email.toLowerCase() === email
  )) {
    return false;
  }
  //hteo dda provjerim da li je email vec u upotrebi, ako jeste ne dozvoljavam 
  currentAccount.user = { ...user, email };
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  return true;
};

export const changeAccountPassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<boolean> => {
  if (!meetsPasswordRequirements(newPassword)) {
    return false;
  }

  const accounts = getAccounts();
  const account = accounts.find(
    candidate => candidate.user.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!account) {
    return false;
  }

  const currentHash = await hashPassword(currentPassword, decodeSalt(account.salt));
  if (currentHash !== account.passwordHash) {
    return false;
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  account.passwordHash = await hashPassword(newPassword, salt);
  account.salt = encodeSalt(salt);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  return true;
};
