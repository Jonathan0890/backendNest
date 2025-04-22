export class CreateLoanDto {
    lender: string;
    amount: number;
    interest_rate: number;
    due_date: Date;
}
