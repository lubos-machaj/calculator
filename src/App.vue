<template>
  <div class="bg-gray-100 pt-0 sm:pt-10 md:pt-20 flex items-start justify-center min-h-screen">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
    <h2 class="text-2xl font-semibold text-gray-800 mb-10">Insurance Calculation</h2>
    <form>
      <div class="mb-6">
        <!-- Insurance Type -->
        <SelectInput
          label="Insurance Type"
          :items="InsuranceSelectItems"
          v-model="insuranceType"
        />

        <!-- Period start -->
        <CalendarInput
          v-if="selectedShortTermInsurance || selectedAnnualInsurance"
          v-model="periodStart"
          label="Period start"
          :min-date="todayDate()"
          @changeDate="changeDate()"
        />

        <!-- Period end -->
        <CalendarInput
          v-if="selectedShortTermInsurance"
          v-model="periodEnd"
          label="Period end"
          :min-date="todayDate()"
          @changeDate="changeDate()"
        />

        <!-- Package -->
        <SelectInput
          label="Package"
          :items="PackageTypeSelectItems"
          v-model="insurancePackage"
        />

        <!-- Number of Persons -->
        <SelectInput
          label="Number of Persons"
          :items="NumberPersonsSelectItems"
          v-model="persons"
        />

        <!-- Additional charges -->
        <div class="mb-10">
         <h4 class="text-md font-medium text-gray-700 mb-2">Select Additional Options</h4>
          <!-- Cancellation -->
          <CheckboxInput
            label="Cancellation"
            id="cancellation"
            v-model="cancellation"
          />
          <!-- Sport Activities -->
          <CheckboxInput
           label="Sport Activities"
           id="sportActivities"
           v-model="sportActivities"
          />
        </div>
      </div>

      <InfoMessages
        v-if="totalPrice && totalPrice > 0 && periodStart && !errorDate"
        :type="MessageTypesEnum.SUCCESS">
        <template #text>
          <h3 class="text-lg font-semibold text-green-800">Total Price: {{ nicePrice(totalPrice) }}</h3>
        </template>
      </InfoMessages>
      <InfoMessages v-else text="Please fill the required fields." :type="MessageTypesEnum.WARNING"/>
      <InfoMessages v-if="errorDate" text="Wrong date." :type="MessageTypesEnum.ERROR"/>
    </form>
  </div>
</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { packageType, additionalCharge, PackageTypeSelectItems, InsuranceSelectItems, NumberPersonsSelectItems } from './constants';
import SelectInput from './components/SelectInput.vue';
import CalendarInput from './components/CalendarInput.vue';
import CheckboxInput from './components/CheckboxInput.vue';
import InfoMessages from './components/InfoMessages.vue';
import { InsuranceEnum, MessageTypesEnum } from './enums';
import type { AppStates } from './types';


const todayDate = (): string => {
  return new Date().toISOString().slice(0, 10)
}

let insuranceType = ref('');
let periodStart = ref(todayDate());
let periodEnd = ref(todayDate());
let insurancePackage = ref('');
let cancellation = ref(false);
let sportActivities = ref(false);
let persons = ref('');
let errorDate = ref(false);

const selectedShortTermInsurance = computed((): boolean => {
  return insuranceType.value === InsuranceEnum.SHORT_TERM
})  

const selectedAnnualInsurance = computed((): boolean => {
  return insuranceType.value === InsuranceEnum.ANNUAL
})

const getDateDifference = (): number | undefined => {
  if (periodEnd.value && periodStart.value) {
    return (new Date(periodEnd.value).getTime() - new Date(periodStart.value).getTime()) / (1000 * 60 * 60 * 24) + 1;
  }
}

const getPackagePrice = (): string | number | undefined  => {
  if (insurancePackage.value && insuranceType.value) {
    return packageType[insurancePackage.value][insuranceType.value];
  }
}

const totalPrice = computed((): number => {
  const packagePerPerson: number = selectedShortTermInsurance ? 
    Number(getPackagePrice()) * Number(getDateDifference())
    : Number(getPackagePrice());
  
  const packageForAllPersons = packagePerPerson * Number(persons.value);
  let totalPrice = packageForAllPersons;

  if (cancellation.value && insuranceType.value) {
    totalPrice += Number((packageForAllPersons * Number(additionalCharge.cancellation?.[insuranceType.value])).toFixed(2));
  }

  if (sportActivities.value && insuranceType.value) {
    totalPrice += Number((packageForAllPersons * Number(additionalCharge.sportActivities?.[insuranceType.value])).toFixed(2));
  }

  return ( Math.round(totalPrice * 100) / 100 );
})

const nicePrice = (price: number): string => {
  const priceToString = price.toString().replace('.', ',');
  return priceToString.indexOf(',') > -1 && priceToString.split(',')[1].length == 1
    ? priceToString + '0€' : priceToString + '€';
}

const dateAsNumber = (date: string): number => {
  return Number(date.replace(/\-/g, ""))
}

const changeDate = () => {
  errorDate.value = false;
  const todayDateAsNumber = Number(new Date().toISOString().slice(0, 10).replace(/\-/g, ""));
  
  if (!periodStart.value) return;

  const periodStartAsNumber = dateAsNumber(periodStart.value);
  const periodEndAsNumber = periodEnd.value ? dateAsNumber(periodEnd.value) : null;

  if (periodStartAsNumber < todayDateAsNumber) {
    errorDate.value = true;
    return;
  }

  if ((selectedShortTermInsurance || !insuranceType.value) && periodEndAsNumber) {
    if (periodEndAsNumber < todayDateAsNumber || periodEndAsNumber < periodStartAsNumber) {
      errorDate.value = true;
    }
  }
}
</script>