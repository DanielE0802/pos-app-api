interface Company {
  id: string;
  name: string;
  nit: string;
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
  economic_activity: string;
  source: string;
  quantity_employees: string;
}

const CompaniesSeed: Company[] = [
  {
    id: '1355415b-ed45-49fa-8aef-e1184f52b1da',
    name: 'Empresa Dos SAS',
    nit: '12131516171',
    address: 'Cra 54 # 56-95',
    phoneNumber: '+573211231456',
    email: 'miempresados@yopmail.com',
    website: 'www.miempresados.com',
    economic_activity: 'Seguridad',
    source: 'Seguridad',
    quantity_employees: '1-10',
  },
  {
    id: 'd21a362c-0c0e-11ee-9dc3-7085c296afc1',
    name: 'Empresa Uno SAS',
    nit: '15161718192',
    address: 'Calle 47D # 80-30',
    phoneNumber: '+573002001000',
    email: 'miempresauno@yopmail.com',
    website: 'www.miempresauno.com',
    economic_activity: 'Ventas',
    source: 'Ventas',
    quantity_employees: '10-100',
  },
];
