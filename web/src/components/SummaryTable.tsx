import { generateDateFromYearBeginning } from "../utils/utils";
import HabitDay from "./HabitDay";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const summaryDates = generateDateFromYearBeginning();

const minimumSummaryDatesLength = 18 * 7;

const amountOfDaysToDisplay = minimumSummaryDatesLength - summaryDates.length;

function SummaryTable() {

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {weekDays.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {summaryDates.map(date => (
          <HabitDay key={date.toString()} />
        ))}

        {amountOfDaysToDisplay > 0 &&
          Array.from({ length: amountOfDaysToDisplay })
            .map((_, index) => (
              <div
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                key={index}
              />
            ))}
      </div>
    </div>
  );
}

export default SummaryTable;