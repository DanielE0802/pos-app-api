interface Category {
  id: string;
  name: string;
  description: string;
  categoryMainCategory: Record<string, string>;
}

export const CategoriesSeed: Category[] = [
  {
    id: 'ed7c31ee-0236-11ee-bec1-7085c296afc1',
    name: 'Tecnologia',
    description: 'Categoría para productos Tecnologicos',
    categoryMainCategory: null,
  },
  {
    id: 'fe390fda-0236-11ee-bec1-7085c296afc1',
    name: 'Computadores',
    description: 'Tecnologia - Computadores',
    categoryMainCategory: { id: 'ed7c31ee-0236-11ee-bec1-7085c296afc1' },
  },
  {
    id: '1e0dc899-0237-11ee-bec1-7085c296afc1',
    name: 'Portatiles',
    description: 'Tecnologia - Computadores - Portatiles',
    categoryMainCategory: { id: 'fe390fda-0236-11ee-bec1-7085c296afc1' },
  },
  {
    id: '1e0dcdc5-0237-11ee-bec1-7085c296afc1',
    name: 'Escritorio',
    description: 'Tecnologia - Computadores - Escritorio',
    categoryMainCategory: { id: 'fe390fda-0236-11ee-bec1-7085c296afc1' },
  },
  {
    id: '8c7f9907-0c23-11ee-9dc3-7085c296afc1',
    name: 'Celulares',
    description: 'Tecnologia - Celulares',
    categoryMainCategory: { id: 'ed7c31ee-0236-11ee-bec1-7085c296afc1' },
  },
  {
    id: '9f4760c8-0c23-11ee-9dc3-7085c296afc1',
    name: 'Android',
    description: 'Tecnologia - Celulares - Android',
    categoryMainCategory: { id: '8c7f9907-0c23-11ee-9dc3-7085c296afc1' },
  },
];
