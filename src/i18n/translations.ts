export type Locale = 'fr' | 'ar' | 'en' | 'es';

export interface Translations {
  // Welcome screen
  selfService: string;
  touchToOrder: string;
  quickSimpleSecure: string;
  securePayment: string;
  quickOrder: string;
  contactless: string;
  chooseOrderOption: string;
  dineIn: string;
  dineInDesc: string;
  takeaway: string;
  takeawayDesc: string;
  back: string;

  // Header
  featuredProduct: string;

  // Menu
  products: string;
  specialOffer: string;
  order: string;
  noProductsInCategory: string;

  // Cart
  yourCart: string;
  cartEmpty: string;
  others: string;
  total: string;
  cancel: string;
  orderBtn: string;
  close: string;
  addAlso: string;
  articles: string;

  // Product Detail
  ingredients: string;
  clickToRemove: string;
  without: string;
  extras: string;
  validate: string;

  // Payment
  payment: string;
  choosePaymentMethod: string;
  summary: string;
  totalToPay: string;
  bankCard: string;
  cardOnKiosk: string;
  atCounter: string;
  cashOrCardAtCounter: string;
  confirmPayment: string;
  processing: string;

  // Confirmation
  orderConfirmed: string;
  thankYou: string;
  yourOrderNumber: string;
  scanToTrack: string;
  estimatedTime: string;
  printTicket: string;
  autoReturn: string;
  newOrder: string;

  // Recommendations
  oftenOrderedWith: string;
}

export const translations: Record<Locale, Translations> = {
  fr: {
    selfService: 'Self‑Service',
    touchToOrder: 'Touchez pour commander',
    quickSimpleSecure: 'Rapide · Simple · Sécurisé',
    securePayment: 'Paiement sécurisé',
    quickOrder: 'Commande rapide',
    contactless: 'Sans contact',
    chooseOrderOption: 'Choisissez votre option de commande',
    dineIn: 'Sur place',
    dineInDesc: 'Consommer sur place',
    takeaway: 'À emporter',
    takeawayDesc: 'Commande à emporter',
    back: 'Retour',
    featuredProduct: 'PRODUIT DU MOMENT !',
    products: 'produit(s)',
    specialOffer: 'OFFRE SPÉCIALE',
    order: 'COMMANDER',
    noProductsInCategory: 'Aucun produit dans cette catégorie',
    yourCart: 'Votre Panier',
    cartEmpty: 'Votre panier est vide',
    others: 'autres',
    total: 'Total',
    cancel: 'ANNULER',
    orderBtn: 'COMMANDER',
    close: 'Fermer',
    addAlso: 'Ajoutez aussi...',
    articles: 'article(s)',
    ingredients: 'INGRÉDIENTS',
    clickToRemove: '(Cliquez pour retirer)',
    without: 'Sans',
    extras: 'EXTRAS',
    validate: 'VALIDER',
    payment: 'Paiement',
    choosePaymentMethod: 'Choisissez votre mode de paiement',
    summary: 'Récapitulatif',
    totalToPay: 'Total à payer',
    bankCard: 'Carte Bancaire',
    cardOnKiosk: 'Paiement CB sur la borne',
    atCounter: 'Au Comptoir',
    cashOrCardAtCounter: 'Espèces ou CB au comptoir',
    confirmPayment: 'CONFIRMER LE PAIEMENT',
    processing: 'Traitement en cours...',
    orderConfirmed: 'Commande Confirmée !',
    thankYou: 'Merci pour votre commande',
    yourOrderNumber: 'Votre numéro de commande',
    scanToTrack: 'Scannez pour suivre votre commande',
    estimatedTime: 'Temps estimé: 5-10 min',
    printTicket: 'Imprimer Ticket',
    autoReturn: 'Retour automatique dans',
    newOrder: 'Nouvelle Commande',
    oftenOrderedWith: 'Souvent commandé avec...',
  },
  ar: {
    selfService: 'خدمة ذاتية',
    touchToOrder: 'المس للطلب',
    quickSimpleSecure: 'سريع · بسيط · آمن',
    securePayment: 'دفع آمن',
    quickOrder: 'طلب سريع',
    contactless: 'بدون تلامس',
    chooseOrderOption: 'اختر نوع الطلب',
    dineIn: 'أكل في المطعم',
    dineInDesc: 'تناول الطعام هنا',
    takeaway: 'سفري',
    takeawayDesc: 'طلب للأخذ',
    back: 'رجوع',
    featuredProduct: '!منتج اليوم',
    products: 'منتج(ات)',
    specialOffer: 'عرض خاص',
    order: 'اطلب',
    noProductsInCategory: 'لا توجد منتجات في هذه الفئة',
    yourCart: 'سلتك',
    cartEmpty: 'سلتك فارغة',
    others: 'أخرى',
    total: 'المجموع',
    cancel: 'إلغاء',
    orderBtn: 'اطلب',
    close: 'إغلاق',
    addAlso: '...أضف أيضا',
    articles: 'عنصر(عناصر)',
    ingredients: 'المكونات',
    clickToRemove: '(انقر للإزالة)',
    without: 'بدون',
    extras: 'إضافات',
    validate: 'تأكيد',
    payment: 'الدفع',
    choosePaymentMethod: 'اختر طريقة الدفع',
    summary: 'الملخص',
    totalToPay: 'المبلغ الإجمالي',
    bankCard: 'بطاقة بنكية',
    cardOnKiosk: 'الدفع بالبطاقة على الآلة',
    atCounter: 'عند الكاونتر',
    cashOrCardAtCounter: 'نقدًا أو بالبطاقة عند الكاونتر',
    confirmPayment: 'تأكيد الدفع',
    processing: '...جاري المعالجة',
    orderConfirmed: '!تم تأكيد الطلب',
    thankYou: 'شكرًا على طلبك',
    yourOrderNumber: 'رقم طلبك',
    scanToTrack: 'امسح لتتبع طلبك',
    estimatedTime: 'الوقت المقدر: 5-10 دقائق',
    printTicket: 'طباعة التذكرة',
    autoReturn: 'العودة التلقائية خلال',
    newOrder: 'طلب جديد',
    oftenOrderedWith: '...يُطلب عادة مع',
  },
  en: {
    selfService: 'Self‑Service',
    touchToOrder: 'Touch to order',
    quickSimpleSecure: 'Quick · Simple · Secure',
    securePayment: 'Secure payment',
    quickOrder: 'Quick order',
    contactless: 'Contactless',
    chooseOrderOption: 'Choose your order option',
    dineIn: 'Dine in',
    dineInDesc: 'Eat here',
    takeaway: 'Takeaway',
    takeawayDesc: 'Take your order',
    back: 'Back',
    featuredProduct: 'FEATURED PRODUCT!',
    products: 'product(s)',
    specialOffer: 'SPECIAL OFFER',
    order: 'ORDER',
    noProductsInCategory: 'No products in this category',
    yourCart: 'Your Cart',
    cartEmpty: 'Your cart is empty',
    others: 'others',
    total: 'Total',
    cancel: 'CANCEL',
    orderBtn: 'ORDER',
    close: 'Close',
    addAlso: 'Add also...',
    articles: 'item(s)',
    ingredients: 'INGREDIENTS',
    clickToRemove: '(Click to remove)',
    without: 'Without',
    extras: 'EXTRAS',
    validate: 'ADD',
    payment: 'Payment',
    choosePaymentMethod: 'Choose your payment method',
    summary: 'Summary',
    totalToPay: 'Total to pay',
    bankCard: 'Bank Card',
    cardOnKiosk: 'Card payment on kiosk',
    atCounter: 'At Counter',
    cashOrCardAtCounter: 'Cash or card at counter',
    confirmPayment: 'CONFIRM PAYMENT',
    processing: 'Processing...',
    orderConfirmed: 'Order Confirmed!',
    thankYou: 'Thank you for your order',
    yourOrderNumber: 'Your order number',
    scanToTrack: 'Scan to track your order',
    estimatedTime: 'Estimated time: 5-10 min',
    printTicket: 'Print Receipt',
    autoReturn: 'Auto return in',
    newOrder: 'New Order',
    oftenOrderedWith: 'Often ordered with...',
  },
  es: {
    selfService: 'Autoservicio',
    touchToOrder: 'Toca para pedir',
    quickSimpleSecure: 'Rápido · Simple · Seguro',
    securePayment: 'Pago seguro',
    quickOrder: 'Pedido rápido',
    contactless: 'Sin contacto',
    chooseOrderOption: 'Elige tu opción de pedido',
    dineIn: 'Para comer aquí',
    dineInDesc: 'Comer en el local',
    takeaway: 'Para llevar',
    takeawayDesc: 'Pedido para llevar',
    back: 'Volver',
    featuredProduct: '¡PRODUCTO DEL MOMENTO!',
    products: 'producto(s)',
    specialOffer: 'OFERTA ESPECIAL',
    order: 'PEDIR',
    noProductsInCategory: 'No hay productos en esta categoría',
    yourCart: 'Tu Carrito',
    cartEmpty: 'Tu carrito está vacío',
    others: 'otros',
    total: 'Total',
    cancel: 'CANCELAR',
    orderBtn: 'PEDIR',
    close: 'Cerrar',
    addAlso: 'Añade también...',
    articles: 'artículo(s)',
    ingredients: 'INGREDIENTES',
    clickToRemove: '(Clic para quitar)',
    without: 'Sin',
    extras: 'EXTRAS',
    validate: 'VALIDAR',
    payment: 'Pago',
    choosePaymentMethod: 'Elige tu método de pago',
    summary: 'Resumen',
    totalToPay: 'Total a pagar',
    bankCard: 'Tarjeta Bancaria',
    cardOnKiosk: 'Pago con tarjeta en el kiosco',
    atCounter: 'En Mostrador',
    cashOrCardAtCounter: 'Efectivo o tarjeta en mostrador',
    confirmPayment: 'CONFIRMAR PAGO',
    processing: 'Procesando...',
    orderConfirmed: '¡Pedido Confirmado!',
    thankYou: 'Gracias por tu pedido',
    yourOrderNumber: 'Tu número de pedido',
    scanToTrack: 'Escanea para seguir tu pedido',
    estimatedTime: 'Tiempo estimado: 5-10 min',
    printTicket: 'Imprimir Ticket',
    autoReturn: 'Retorno automático en',
    newOrder: 'Nuevo Pedido',
    oftenOrderedWith: 'A menudo pedido con...',
  },
};

export const localeConfig: Record<Locale, { label: string; flag: string; dir: 'ltr' | 'rtl'; short: string }> = {
  fr: { label: 'Français', flag: '🇫🇷', dir: 'ltr', short: 'FR' },
  ar: { label: 'العربية', flag: '🇹🇳', dir: 'rtl', short: 'ع' },
  en: { label: 'English', flag: '🇬🇧', dir: 'ltr', short: 'EN' },
  es: { label: 'Español', flag: '🇪🇸', dir: 'ltr', short: 'ES' },
};
