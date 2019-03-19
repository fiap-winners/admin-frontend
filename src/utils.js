const ACCOUNT_KEY = 'trust_academy_account';

/**
 * Recuperar o objeto "account" to localStorage do navegador.
 */
export function getAccountFromLocalStorage() {
  const accountStr = window.localStorage.getItem(ACCOUNT_KEY);
  return !!accountStr ? window.JSON.parse(accountStr) : undefined;
}

/**
 * Armazenar o objeto "account" no localStorage do navegador
 */
export function addAccountToLocalStorage(account: Account) {
  window.localStorage.setItem(ACCOUNT_KEY, window.JSON.stringify(account));
}

/**
 * Armazenar o objeto "account" no localStorage do navegador
 */
export function removeAccountFromLocalStorage() {
  window.localStorage.removeItem(ACCOUNT_KEY);
}