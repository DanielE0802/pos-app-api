interface Product {
  id: string;
  name: string;
  description: string;
  barCode: string;
  sku: string;
  priceSale: number;
  quantityStock: number;
  productMainProduct_id: string | null;
  category_id: string;
  brand_id: string;
  images: string;
  typeProduct: number;
  state: number;
  sellInNegative: number;
  priceBase: number;
  taxesOption: number;
}

const ProductsSeed: Product[] = [
  {
    id: '2339afda-7f2c-4ee2-a27f-c13f188736d2',
    name: 'Quatro',
    description: 'Esta es la descripcion de la Quatro',
    barCode: '224511963',
    sku: 'A156548C',
    priceSale: 19500,
    quantityStock: 60,
    productMainProduct_id: '540a9326-da3d-467a-b4db-aff047e31b31',
    category_id: '9f4760c8-0c23-11ee-9dc3-7085c296afc1',
    brand_id: '60ba1478-0234-11ee-bec1-7085c296afc1',
    images: 'https://acortar.link/lwTj61',
    typeProduct: 2,
    state: 1,
    sellInNegative: 1,
    priceBase: 12300,
    taxesOption: 19,
  },
  {
    id: '540a9326-da3d-467a-b4db-aff047e31b31',
    name: 'Coca-Cola Zero',
    description: 'Esta es la descripcion de la Coca-Cola Zero',
    barCode: '121311115',
    sku: 'A156548C',
    priceSale: 25000,
    quantityStock: 100,
    productMainProduct_id: null,
    category_id: '9f4760c8-0c23-11ee-9dc3-7085c296afc1',
    brand_id: '60ba1478-0234-11ee-bec1-7085c296afc1',
    images: 'https://acortar.link/sumH4S',
    typeProduct: 2,
    state: 1,
    sellInNegative: 1,
    priceBase: 16000,
    taxesOption: 19,
  },
];
