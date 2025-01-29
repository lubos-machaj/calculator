export class DateValidator {
  static validate(params: {
    periodStart: string,
    periodEnd?: string,
    isShortTerm: boolean
  }): { isValid: boolean; error?: string } {
    const todayDateAsNumber = Number(new Date().toISOString().slice(0, 10).replace(/\-/g, ""));
    const periodStartAsNumber = Number(params.periodStart.replace(/\-/g, ""));
    const periodEndAsNumber = params.periodEnd ? Number(params.periodEnd.replace(/\-/g, "")) : null;

    if (periodStartAsNumber < todayDateAsNumber) {
      return { isValid: false, error: 'Start date cannot be in the past' };
    }

    if (params.isShortTerm && periodEndAsNumber) {
      if (periodEndAsNumber < todayDateAsNumber || periodEndAsNumber < periodStartAsNumber) {
        return { isValid: false, error: 'End date must be after start date and not in the past' };
      }
    }

    return { isValid: true };
  }
} 