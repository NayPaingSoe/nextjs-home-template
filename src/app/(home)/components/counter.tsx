"use client";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '@/redux/features/CounterSlice';
import { RootState } from '@/redux/store';

export default function CounterPage() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <Button onClick={() => dispatch(decrement())}>-</Button>
          <span className="text-2xl">{count}</span>
          <Button onClick={() => dispatch(increment())}>+</Button>
        </div>

      </main>
    </div>
  );
}
