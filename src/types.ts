import type {
  InsuranceSelectItems,
  NumberPersonsSelectItems,
  PackageTypeSelectItems,
} from './constants'

export type SelectType = {
  [key: string]: string
}

export type PackageType = {
  [key: string]: TypeInsurance
}

interface TypeInsurance {
  [key: string]: string | number
}

export type AdditionalCharge = {
  cancellation: AdditionalChargeValues
  sportActivities: AdditionalChargeValues
}

interface AdditionalChargeValues {
  [key: string]: number
}

export type AppStates = {
  insurance: keyof typeof InsuranceSelectItems | ''
  periodStart: string
  periodEnd: string
  periodDiff: string
  package: keyof typeof PackageTypeSelectItems | ''
  cancellation: boolean
  sportActivities: boolean
  persons: keyof typeof NumberPersonsSelectItems | ''
  totalPrice: number
  errorDate: boolean
}

export type MessageTypes = 'success' | 'error' | 'warning'
