import { ReactNode } from "react";




interface ContainerProps {
   className?: string;
   children: ReactNode
}

const Container :React.FC<ContainerProps> = ({className='', children}) => {

  return (
    <div className={ `container mx-auto ${className}`}>
        {children}
    </div>
  )
}

export default Container

