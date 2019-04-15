import * as R from 'ramda';
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

/**
 * Agrupa is documentos com instituto, departamento, curso e alunos iguais
 */
export function groupDocuments(documents) {
  return R.compose(
    R.values,
    R.reduce((acc, cur) => {
      const key = `${cur.institute.id}${cur.department.id}${cur.course.id}${cur.student.id}`;
      if (acc[key]) {
        acc[key].push(cur);
      } else {
        acc[key] = [cur];
      }
      return acc;
    }, {})
  )(documents);
}

export function formattedDateAndTime(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} às ${date.toLocaleTimeString()}`;
}