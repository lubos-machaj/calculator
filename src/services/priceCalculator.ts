export class PriceCalculator {
  static calculateTotal(params: {
    insurance: string,
    package: string,
    persons: number,
    dateDifference: number,
    cancellation: boolean,
    sportActivities: boolean
  }) {
    const packagePerPerson = params.insurance === 'shortTerm' 
      ? packageType[params.package][params.insurance] * params.dateDifference
      : packageType[params.package][params.insurance];
    
    const packageForAllPersons = packagePerPerson * params.persons;
    let totalPrice = packageForAllPersons;

    if (params.cancellation) {
      totalPrice += packageForAllPersons * additionalCharge.cancellation[params.insurance];
    }

    if (params.sportActivities) {
      totalPrice += packageForAllPersons * additionalCharge.sportActivities[params.insurance];
    }

    return Math.round(totalPrice * 100) / 100;
  }
} 