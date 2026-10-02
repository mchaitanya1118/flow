import { NextResponse } from 'next/server';
import { MortgageCalculatorSchema } from '@estateflow/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parseResult = MortgageCalculatorSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid mortgage calculation payload',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { propertyPrice, downPaymentPercent, interestRateAnnual, loanTermYears } = parseResult.data;

    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRateAnnual / 12 / 100;
    const totalMonths = loanTermYears * 12;

    const monthlyEmi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalRepayment = monthlyEmi * totalMonths;
    const totalInterest = totalRepayment - loanAmount;

    return NextResponse.json({
      success: true,
      data: {
        propertyPrice,
        downPayment,
        loanAmount,
        interestRateAnnual,
        loanTermYears,
        monthlyEmi: Math.round(monthlyEmi),
        totalInterest: Math.round(totalInterest),
        totalRepayment: Math.round(totalRepayment),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error calculating mortgage' },
      { status: 500 }
    );
  }
}
