interface PDV {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  main: boolean;
  location: Record<string, string>;
  company: Record<string, string>;
}

const PdvsSeed: PDV[] = [
  {
    id: '3e5de367-0c1c-11ee-9dc3-7085c296afc1',
    name: 'Punto Principal',
    description: 'PDV Main',
    address: 'Calle 100 # 98-96',
    phone: '+573225315406',
    main: true,
    location: { id: '25ea0975-0248-11ee-bec1-7085c296afc1' },
    company: { id: 'd21a362c-0c0e-11ee-9dc3-7085c296afc1' },
  },
  {
    id: '3e5de822-0c1c-11ee-9dc3-7085c296afc1',
    name: 'Segundo Punto',
    description: 'PDV NoMain',
    address: 'Calle 80 Bis # 34-23',
    phone: '+573226065548',
    main: false,
    location: { id: '25ea0975-0248-11ee-bec1-7085c296afc1' },
    company: { id: 'd21a362c-0c0e-11ee-9dc3-7085c296afc1' },
  },
];
