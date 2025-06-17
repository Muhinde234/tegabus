interface  inputFieldProps {
  label?:string;
  name:string;
  type?:string;
  placeholder?:string;
  value?:string;
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
  error?:string;
  className?:string;
  required?:boolean;
  
}




const Input:React.FC<inputFieldProps>= ({
    label,
    name,
    type="text",
    onChange,
    className="",
    placeholder,
    value
    
    
}) => { 



  return (
    <div>
        {label && <label htmlFor={name} className="block">{label}</label>}
        <input
        name={name}
        type={type}
        onChange={onChange}
        className={`${className}`}
        placeholder={placeholder}
        value={value}/>
    </div>
  )
}

export default Input