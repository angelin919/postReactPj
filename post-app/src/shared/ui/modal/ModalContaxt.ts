import { createContext, useContext } from "react"

interface ModalContextType{
    isOpen:boolean
    onClose: ()=>void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)
 export const useModalContext = () => {
    const context = useContext(ModalContext)
    if(!context){
        throw new Error('Modal components must be used within Modal')
    }
    return context
 }

