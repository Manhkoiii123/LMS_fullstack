import { Document, Model } from "mongoose";
interface MonthData {
  month: string;
  count: number;
}
export async function generateLast12MonthsData<T extends Document>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i + 1,
      0
    );

    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );

    const monthYear = startDate.toLocaleDateString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    last12Months.push({ month: monthYear, count });
  }

  return { last12Months };
}
