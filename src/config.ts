export const COMPANY = {
  name: 'Pilot Convoi Slovakia',
  legalName: 'Pilot Convoi Slovakia, s. r. o.',
  ico: '56184981',
  dic: '2122232629',
  icdph: 'SK2122232629',
  claim: 'Safe. Reliable. Professional.',
  phone: '+421907450919',
  phoneDisplay: '+421 907 450 919',
  whatsapp: '421907450919',
  email: 'lubek@pcs.sk',
  address: 'Sadová 621/54, 094 31 Hanušovce nad Topľou',
} as const;

// Web3Forms: bezplatný účet na https://web3forms.com (registrácia na lubek@pcs.sk),
// vygenerovaný Access Key vlož sem. Kým je tu placeholder, formulár po odoslaní
// zobrazí chybovú hlášku s telefónom/e-mailom ako náhradným kanálom.
export const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

// Galéria: keď budú reálne fotky/videá, pridaj súbory do src/assets/gallery/
// a doplň záznamy sem — sekcia Galéria sa na stránke objaví automaticky.
export const GALLERY: { src: ImageMetadata; alt: string }[] = [];
