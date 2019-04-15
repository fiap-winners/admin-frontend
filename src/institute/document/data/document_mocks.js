const docs = [
  {
    id: 4,
    institute: { id: 1, name: 'FIAP' },
    department: { id: 1, name: 'FIAP ON' },
    course: { id: 1, name: 'Análise e desenv. de sistemas' },
    student: { id: 2, name: 'Leonardo Cristofani' },
    type: { id: 1, name: 'Histórico Escolar' },
    content: 'Documento 2',
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 1,
    institute: { id: 1, name: 'FIAP' },
    department: { id: 1, name: 'FIAP ON' },
    course: { id: 1, name: 'Análise e desenv. de sistemas' },
    student: { id: 1, name: 'Henrique Lopes' },
    type: { id: 1, name: 'Histórico Escolar' },
    content: 'Documento 1',
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 2,
    institute: { id: 1, name: 'FIAP' },
    department: { id: 1, name: 'FIAP ON' },
    course: { id: 1, name: 'Análise e desenv. de sistemas' },
    student: { id: 1, name: 'Henrique Lopes' },
    type: { id: 2, name: 'Certificado de Conclusão' },
    content: 'Documento 1 alterado',
    createdAt: Date.now(),
    modifiedAt: Date.now()
  },
  {
    id: 3,
    institute: { id: 1, name: 'FIAP' },
    department: { id: 1, name: 'FIAP ON' },
    course: { id: 1, name: 'Análise e desenv. de sistemas' },
    student: { id: 2, name: 'Leonardo Cristofani' },
    type: { id: 1, name: 'Histórico Escolar' },
    content: 'Documento 2',
    createdAt: Date.now(),
    modifiedAt: Date.now()
  }
];

export default docs;