import Submit from '@/Components/Attendance/Submit';
import Submitted from '@/Components/Attendance/Submitted';
import { usePage } from '@inertiajs/react';

export default function Index() {
   const {isAttended} = usePage().props;

   if(isAttended) {
      return <Submitted/>
   }else {
      return <Submit/>
   }
}