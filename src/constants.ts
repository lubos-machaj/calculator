import { InsuranceEnum, PackageTypeEnum } from './enums'
import type { SelectType, AdditionalCharge, PackageType } from './types'

export const InsuranceSelectItems: SelectType = {
  [InsuranceEnum.SHORT_TERM]: 'Short Term',
  [InsuranceEnum.ANNUAL]: 'Annual',
}

export const PackageTypeSelectItems: SelectType = {
  [PackageTypeEnum.BASIC]: 'Basic',
  [PackageTypeEnum.EXTENDED]: 'Extended',
  [PackageTypeEnum.EXTRA]: 'Extra',
}

export const NumberPersonsSelectItems: SelectType = {
  1: '1',
  2: '2',
  3: '3',
}

export const packageType: PackageType = {
  basic: {
    shortTerm: 1.2,
    annual: 39,
  },
  extended: {
    shortTerm: 1.8,
    annual: 49,
  },
  extra: {
    shortTerm: 2.4,
    annual: 59,
  },
}

export const additionalCharge: AdditionalCharge = {
  cancellation: {
    shortTerm: 0.5,
    annual: 0.2,
  },
  sportActivities: {
    shortTerm: 0.3,
    annual: 0.1,
  },
}
