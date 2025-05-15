import { randomUUID } from "node:crypto";
import { ExpenseProps } from "@/src/db/schema";
import { convertAmountToMiliunits } from "@/src/utils/utils";

export class Expense {
  private props: ExpenseProps;

  constructor(props: Omit<ExpenseProps, "id">, id?: string | undefined) {
    this.props = {
      id: id ?? randomUUID(),
      ...props,
    };
  }

  id() {
    return this.props.id;
  }

  name() {
    return this.props.name;
  }

  value() {
    return convertAmountToMiliunits(this.props.value);
  }

  date() {
    return this.props.date;
  }

  category() {
    return this.props.category;
  }

  bankName() {
    return this.props.bankName;
  }

  createdAt() {
    return this.props.createdAt;
  }

  updatedAt() {
    return this.props.updatedAt;
  }
}
