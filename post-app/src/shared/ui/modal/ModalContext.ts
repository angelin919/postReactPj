import { createContext, useContext,MouseEventHandler } from "react"

interface ModalContextType {
    isOpen:boolean
    onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)
 export const useModalContext = () => {
    const context = useContext(ModalContext)
    if(!context){
        throw new Error('Modal components must be used within Modal')
    }
    return context
 }

