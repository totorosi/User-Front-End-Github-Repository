/** 알레르기 ENUM 및 공통 데이터 */

export enum AllergyEnum {
  EGG = 'EGG',
  MILK = 'MILK',
  BUCKWHEAT = 'BUCKWHEAT',
  PEANUT = 'PEANUT',
  SOYBEAN = 'SOYBEAN',
  WHEAT = 'WHEAT',
  MACKEREL = 'MACKEREL',
  CRAB = 'CRAB',
  SHRIMP = 'SHRIMP',
  PORK = 'PORK',
  PEACH = 'PEACH',
  TOMATO = 'TOMATO',
  SULFITES = 'SULFITES',
  WALNUT = 'WALNUT',
  CHICKEN = 'CHICKEN',
  BEEF = 'BEEF',
  SQUID = 'SQUID',
  SHELLFISH = 'SHELLFISH',
  PINE_NUT = 'PINE_NUT',
}

export interface AllergyItem {
  code: number;
  label: string;
  enum: AllergyEnum;
}

export const ALLERGY_ITEMS: AllergyItem[] = [
  { code: 1, label: '난류(가금류)', enum: AllergyEnum.EGG },
  { code: 2, label: '우유', enum: AllergyEnum.MILK },
  { code: 3, label: '메밀', enum: AllergyEnum.BUCKWHEAT },
  { code: 4, label: '땅콩', enum: AllergyEnum.PEANUT },
  { code: 5, label: '대두', enum: AllergyEnum.SOYBEAN },
  { code: 6, label: '밀', enum: AllergyEnum.WHEAT },
  { code: 7, label: '고등어', enum: AllergyEnum.MACKEREL },
  { code: 8, label: '게', enum: AllergyEnum.CRAB },
  { code: 9, label: '새우', enum: AllergyEnum.SHRIMP },
  { code: 10, label: '돼지고기', enum: AllergyEnum.PORK },
  { code: 11, label: '복숭아', enum: AllergyEnum.PEACH },
  { code: 12, label: '토마토', enum: AllergyEnum.TOMATO },
  { code: 13, label: '아황산류', enum: AllergyEnum.SULFITES },
  { code: 14, label: '호두', enum: AllergyEnum.WALNUT },
  { code: 15, label: '닭고기', enum: AllergyEnum.CHICKEN },
  { code: 16, label: '쇠고기', enum: AllergyEnum.BEEF },
  { code: 17, label: '오징어', enum: AllergyEnum.SQUID },
  { code: 18, label: '조개류(굴,전복,홍합포함)', enum: AllergyEnum.SHELLFISH },
  { code: 19, label: '잣', enum: AllergyEnum.PINE_NUT },
];
