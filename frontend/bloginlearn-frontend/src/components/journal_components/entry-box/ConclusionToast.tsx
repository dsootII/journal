'use client';
import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { Button } from '@radix-ui/themes';

const ConclusionButtonWithToast = ({open, setOpen, handleThoughtConclusion}: any) => {
  
  // const eventDateRef = React.useRef(new Date());
  // const timerRef = React.useRef(0);

  // React.useEffect(() => {
  //   return () => clearTimeout(timerRef.current);
  // }, []);

  

  return (
    <Toast.Provider swipeDirection="right" duration={3000}>
      <Button
        className="inline-flex items-center h-full justify-center bg-black rounded font-medium text-[15px] px-[15px] leading-[35px] hover:bg-green-500"
        onClick={handleThoughtConclusion}
      >
        Conclude
      </Button>

      <Toast.Root
        className="bg-green-200 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          Entry concluded
        </Toast.Title>
        <Toast.Description asChild>
          <div>Please refresh if it's not visible on the list</div>
        </Toast.Description>
        <Toast.Action className="[grid-area:_action]" asChild altText="Goto schedule to undo">
          <button className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
            Undo
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

function oneWeekAway() {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date: any) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

export default ConclusionButtonWithToast;