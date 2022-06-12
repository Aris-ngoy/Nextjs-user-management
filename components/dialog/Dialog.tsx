import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from '../TextInput/TextInput';
import { useForm } from 'react-hook-form';
import Button from '../button/Button';
import { useState } from 'react';
import { onExportingData } from '../../network/attendanceService';
import { IResponse } from '../../models/IResponse';
import { Attendance, User } from '@prisma/client';
import { generateExcel } from '../../helpers/exportDataToExecl';
import { formatDateTime } from '../../helpers/constants';

import * as XLSX from 'xlsx';

const DialogComponent = ({ open, handleClose, id }: Props)=>{

    const { control, handleSubmit, setValue } = useForm({ criteriaMode : "all" });
    
    const [IsLoading, setIsLoading] = useState<boolean>(false)
    const excelDataRef = React.useRef<{ title : string, items : any[] } | null>(null)
    const [IsReady, setIsReady] = useState(false)

    const samplejson2 = [
        { name: "name01" , age:"20",sex:"M" },
        { name: "name02" , age:"22",sex:"F" },
        { name: "name03" , age:"20",sex:"M" }
      ]

    const onSubmit = async ({ fromDate, toDate }:any) =>{
        try {
            setIsLoading(true)
            setIsReady(false)
            const body = {
                fromDate,
                toDate,
                userId : id
            }
            const { data } = await onExportingData<IResponse<IAttendance[]>>(body)

            if(data && data.length > 0){
                const firstItem = data[0]
                const title = `${firstItem.user?.first_name} ${firstItem.user?.last_name}`;
                const items = data?.map((item:IAttendance)=>{
                    return {
                        "Date" : formatDateTime(item.createdAt),
                        "Clock In" : formatDateTime(item.clockIn),
                        "Clock Out" : item.clockOut !== null ? formatDateTime(item.clockOut) : ""
                    }
                })
                excelDataRef.current = {
                    title,
                    items
                }
            }
            setIsReady(true)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setIsReady(false)
        }
    }

    const downloadExcel = () => {
        if(excelDataRef.current){
            
            const { title, items } = excelDataRef.current

            const worksheet = XLSX.utils.json_to_sheet(items);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, title);
            //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
            //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
            XLSX.writeFile(workbook, "DataSheet.xlsx");
            handleClose()
            setIsReady(false)
        }
    };

  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Export Data</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Export data to excel
          </DialogContentText> */}
          <form  onSubmit={handleSubmit(onSubmit)}>
            <TextInput control={control} name="fromDate" rules={{ required : "From Date is required" }}  type="date"  placeholder='From Date'  />
            <TextInput control={control} name="toDate" rules={{ required : "To Date is required" }}  type="date"  placeholder='To Date'  />
            {
                !IsReady && <Button name='Export' IsLoading={IsLoading} />
            }
          </form>
        </DialogContent>
           {
               IsReady &&
               <a className='cursor-pointer w-[365px] mx-4 self-center text-center bg-red-500/80 rounded-md text-white p-3' onClick={downloadExcel}>
                    <span>Download Execl</span>
               </a>
           }
        <DialogActions>
        </DialogActions>
      </Dialog>
  )
}

export default DialogComponent

type Props = {
    open : boolean
    handleClose : ()=>void
    id? : number
}

interface IAttendance extends Attendance{
    user? : User
}