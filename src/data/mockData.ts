import { Category, Product, MediaItem } from '@/types/kiosk';

// Import product images
import burgerClassic from '@/assets/products/burger-classic.png';
import fries from '@/assets/products/fries.png';
import nuggets from '@/assets/products/nuggets.png';
import salad from '@/assets/products/salad.png';
import cocaCola from '@/assets/products/coca-cola.png';
import sundae from '@/assets/products/sundae.png';
import onionRings from '@/assets/products/onion-rings.png';
import wrap from '@/assets/products/wrap.png';
import sprite from '@/assets/products/sprite.png';
import fanta from '@/assets/products/fanta.png';
import water from '@/assets/products/water.png';
import coffee from '@/assets/products/coffee.png';
import brownie from '@/assets/products/brownie.png';
import applePie from '@/assets/products/apple-pie.png';
import wrapBeef from '@/assets/products/wrap-beef.png';
import saladCaesar from '@/assets/products/salad-caesar.png';

// Import ingredient images
import lettuce from '@/assets/ingredients/lettuce.png';
import tomato from '@/assets/ingredients/tomato.png';
import onion from '@/assets/ingredients/onion.png';
import cheese from '@/assets/ingredients/cheese.png';
import pickle from '@/assets/ingredients/pickle.png';
import sauce from '@/assets/ingredients/sauce.png';

export const categories: Category[] = [
  { id: 'burgers', name: 'Burgers', icon: '🍔', image: burgerClassic },
  { id: 'sides', name: 'Accompagnements', icon: '🍟', image: fries },
  { id: 'drinks', name: 'Boissons', icon: '🥤', image: cocaCola },
  { id: 'salads', name: 'Salades', icon: '🥗', image: salad },
  { id: 'wraps', name: 'Wraps', icon: '🌯', image: wrap },
  { id: 'desserts', name: 'Desserts', icon: '🍨', image: sundae },
];

export const products: Product[] = [
  // BURGERS
  {
    id: 'burger-classic',
    name: 'Burger Classic',
    description: 'Pain sésame, steak 100% bœuf, fromage cheddar, salade, tomate, oignon, cornichon, sauce spéciale',
    price: 55.00,
    image: burgerClassic,
    categoryId: 'burgers',
    isAvailable: true,
    isPromo: true,
    promoPrice: 45.00,
    ingredients: [
      { id: 'lettuce', name: 'Salade', image: lettuce, removable: true },
      { id: 'tomato', name: 'Tomate', image: tomato, removable: true },
      { id: 'onion', name: 'Oignon', image: onion, removable: true },
      { id: 'cheese', name: 'Fromage', image: cheese, removable: true },
      { id: 'pickle', name: 'Cornichon', image: pickle, removable: true },
      { id: 'sauce', name: 'Sauce', image: sauce, removable: true },
    ],
    extras: [
      { id: 'extra-cheese', name: 'Extra Fromage', price: 8.00, image: cheese },
      { id: 'extra-sauce', name: 'Extra Sauce', price: 5.00, image: sauce },
    ]
  },
  {
    id: 'burger-double',
    name: 'Double Burger',
    description: 'Pain sésame, double steak 100% bœuf, double fromage cheddar, salade, tomate, oignon, cornichon, sauce BBQ',
    price: 75.00,
    image: burgerClassic,
    categoryId: 'burgers',
    isAvailable: true,
    ingredients: [
      { id: 'lettuce', name: 'Salade', image: lettuce, removable: true },
      { id: 'tomato', name: 'Tomate', image: tomato, removable: true },
      { id: 'onion', name: 'Oignon', image: onion, removable: true },
      { id: 'cheese', name: 'Fromage', image: cheese, removable: true },
      { id: 'pickle', name: 'Cornichon', image: pickle, removable: true },
      { id: 'sauce', name: 'Sauce BBQ', image: sauce, removable: true },
    ],
    extras: [
      { id: 'extra-cheese', name: 'Extra Fromage', price: 8.00, image: cheese },
      { id: 'extra-sauce', name: 'Extra Sauce', price: 5.00, image: sauce },
    ]
  },
  
  // SIDES
  {
    id: 'fries',
    name: 'Frites',
    description: 'Frites dorées et croustillantes',
    price: 18.00,
    image: fries,
    categoryId: 'sides',
    isAvailable: true,
    ingredients: [],
  },
  {
    id: 'nuggets-6',
    name: 'Chicken Nuggets x6',
    description: '6 nuggets de poulet croustillants',
    price: 35.00,
    image: nuggets,
    categoryId: 'sides',
    isAvailable: true,
    ingredients: [],
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings x8',
    description: '8 rondelles d\'oignon croustillantes',
    price: 25.00,
    image: onionRings,
    categoryId: 'sides',
    isAvailable: true,
    ingredients: [],
  },
  
  // DRINKS
  {
    id: 'coca-cola',
    name: 'Coca-Cola 33cl',
    description: 'Coca-Cola classique bien frais',
    price: 15.00,
    image: cocaCola,
    categoryId: 'drinks',
    isAvailable: true,
    ingredients: [],
  },
  {
    id: 'sprite',
    name: 'Sprite 33cl',
    description: 'Sprite citron-lime rafraîchissant',
    price: 15.00,
    image: sprite,
    categoryId: 'drinks',
    isAvailable: true,
    ingredients: [],
  },
  {
    id: 'fanta',
    name: 'Fanta Orange 33cl',
    description: 'Fanta orange pétillant',
    price: 15.00,
    image: fanta,
    categoryId: 'drinks',
    isAvailable: true,
    ingredients: [],
  },
  {
    id: 'water',
    name: 'Eau Minérale 50cl',
    description: 'Eau minérale naturelle',
    price: 10.00,
    image: water,
    categoryId: 'drinks',
    isAvailable: true,
    ingredients: [],
  },
  {
    id: 'coffee',
    name: 'Café Latte',
    description: 'Café espresso avec lait chaud',
    price: 20.00,
    image: coffee,
    categoryId: 'drinks',
    isAvailable: true,
    ingredients: [],
  },
  
  // SALADS
  {
    id: 'salad-nature',
    name: 'Salade Nature',
    description: 'Laitue fraîche, tomates cerises, concombre, oignon rouge',
    price: 30.00,
    image: salad,
    categoryId: 'salads',
    isAvailable: true,
    ingredients: [
      { id: 'tomato', name: 'Tomate', image: tomato, removable: true },
      { id: 'onion', name: 'Oignon', image: onion, removable: true },
    ],
  },
  {
    id: 'salad-caesar',
    name: 'Salade César',
    description: 'Laitue romaine, poulet grillé, parmesan, croûtons, sauce César',
    price: 45.00,
    image: saladCaesar,
    categoryId: 'salads',
    isAvailable: true,
    ingredients: [
      { id: 'lettuce', name: 'Salade', image: lettuce, removable: true },
      { id: 'cheese', name: 'Parmesan', image: cheese, removable: true },
    ],
    extras: [
      { id: 'extra-cheese', name: 'Extra Parmesan', price: 8.00, image: cheese },
    ]
  },
  
  // WRAPS
  {
    id: 'wrap-chicken',
    name: 'Wrap Poulet',
    description: 'Tortilla, poulet grillé, salade, fromage, sauce',
    price: 45.00,
    image: wrap,
    categoryId: 'wraps',
    isAvailable: true,
    ingredients: [
      { id: 'lettuce', name: 'Salade', image: lettuce, removable: true },
      { id: 'tomato', name: 'Tomate', image: tomato, removable: true },
      { id: 'cheese', name: 'Fromage', image: cheese, removable: true },
      { id: 'sauce', name: 'Sauce', image: sauce, removable: true },
    ],
  },
  {
    id: 'wrap-beef',
    name: 'Wrap Bœuf',
    description: 'Tortilla, viande de bœuf épicée, légumes frais, fromage fondu',
    price: 50.00,
    image: wrapBeef,
    categoryId: 'wraps',
    isAvailable: true,
    ingredients: [
      { id: 'lettuce', name: 'Salade', image: lettuce, removable: true },
      { id: 'tomato', name: 'Tomate', image: tomato, removable: true },
      { id: 'onion', name: 'Oignon', image: onion, removable: true },
      { id: 'cheese', name: 'Fromage', image: cheese, removable: true },
      { id: 'sauce', name: 'Sauce', image: sauce, removable: true },
    ],
    extras: [
      { id: 'extra-cheese', name: 'Extra Fromage', price: 8.00, image: cheese },
    ]
  },
  
  // DESSERTS
  {
    id: 'sundae-choco',
    name: 'Sundae Chocolat',
    description: 'Glace vanille, sauce chocolat, chantilly',
    price: 20.00,
    image: sundae,
    categoryId: 'desserts',
    isAvailable: true,
    ingredients: [],
  },
  {
    id: 'brownie',
    name: 'Brownie Chocolat',
    description: 'Brownie fondant au chocolat noir avec sauce chocolat',
    price: 25.00,
    image: brownie,
    categoryId: 'desserts',
    isAvailable: true,
    ingredients: [],
  },
  {
    id: 'apple-pie',
    name: 'Tarte aux Pommes',
    description: 'Part de tarte aux pommes maison avec boule de glace vanille',
    price: 28.00,
    image: applePie,
    categoryId: 'desserts',
    isAvailable: true,
    ingredients: [],
  },
];

export const welcomeMedia: MediaItem[] = [
  {
    id: 'video-1',
    type: 'video',
    url: 'https://videos.pexels.com/video-files/3298572/3298572-uhd_2560_1440_30fps.mp4',
    title: 'Bienvenue',
    duration: 30000,
    isActive: true,
  },
];

export const promoProducts = products.filter(p => p.isPromo);
export const topSellers = products.slice(0, 4);
