function InputWithOutText({text,name,onChange}){
    return (<input type="text" placeholder={text} className="animatedInputCautiva" name={name} style={{background:"#F5F4F7",borderRadius:"5px",display:"block",width:"100%",padding:"10px"}} onChange={onChange ? e=>onChange(e) : null} />)
}

export {InputWithOutText}