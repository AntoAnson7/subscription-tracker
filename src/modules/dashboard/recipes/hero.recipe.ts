import { sva } from 'styled-system/css';
import { heroBase } from '@/modules/dashboard/recipes/heroBase.styles';
import { heroVariants } from '@/modules/dashboard/recipes/heroVariants.styles';

export const heroStyles = sva({
  slots: [
    'root',
    'contentWrapper',
    'leftGroup',
    'topRow',
    'kpiLabel',
    'activePillWrapper',
    'amountRow',
    'amount',
    'perMonth',
    'annualCollapsible',
    'annualInner',
    'annualRow',
    'annualText',
    'nextBillPill',
    'actionsRow',
    'primaryBtn',
  ],
  base: heroBase,
  variants: heroVariants,
});
