import { parseAIExtractedDate } from "@/src/utils/utils";
import { CategorizedExpense } from "../ai/invoices.ai";
import { Expense } from "../models/expenses.model";

export class ExpensesMapper {
  static batchCategorizedToDomain(data: CategorizedExpense) {
    return data.expenses.map((raw) => {
      return new Expense({
        bankName: data.invoiceDetails.bankName,
        name: raw.name,
        date: parseAIExtractedDate(raw.date),
        value: raw.value,
        category: raw.category,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }
}
