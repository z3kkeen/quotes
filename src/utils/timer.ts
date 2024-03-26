'use server'
import { updateData } from "./handleDatabase"

export const onSubmit = async (formData: FormData)=> {
    const name = formData.get('nameData') + ''
    updateData(Number(formData.get('idData')), name, Number(formData.get('timeData')));    
}