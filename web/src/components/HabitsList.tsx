import { useEffect, useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { api } from '../lib/axios';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';


interface Props {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

function HabitsList({ date, onCompletedChanged }: Props) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    await api.patch(`habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId);

    if (isHabitCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    });

    onCompletedChanged(completedHabits.length);
  }


  useEffect(() => {
    api.get('day', {
      params: {
        date: date.toISOString(),
      }
    }).then(response => {
      setHabitsInfo(response.data);
    });
  }, []);

  return (

    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map(possibleHabit => (
        <Checkbox.Root
          key={possibleHabit.id}
          onCheckedChange={() => handleToggleHabit(possibleHabit.id)}
          checked={habitsInfo.completedHabits.includes(possibleHabit.id)}
          disabled={isDateInPast}
          className="flex items-center gap-3 group">
          <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
            {possibleHabit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
};

export default HabitsList;