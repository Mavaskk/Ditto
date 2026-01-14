import { forwardRef } from "react"; // hook utilizzato per passare il ref


const Input = forwardRef(({ label, error, className, ...props }, ref)) => {



        return (


            <div>
                <label>{label}</label>
                <input ref={ref} type="text" />
            </div>
        )



})

export default Input


