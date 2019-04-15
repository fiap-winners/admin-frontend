// import * as R from 'ramda';
import mocks from './document_mocks';

export function fetchDocuments(instituteId: number) {
  return new Promise(resolve => {
    resolve(mocks);
    // const grouped = R.groupWith((a, b) => {
    //   return `${a.institute.id}${a.department.id}${a.course.id}${a.student.id}` ===
    //     `${b.institute.id}${b.department.id}${b.course.id}${b.student.id}`;
    // }, mocks);
    // resolve(grouped);
  });
}