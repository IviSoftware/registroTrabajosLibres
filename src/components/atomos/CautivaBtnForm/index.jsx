function CautivaBtnForm({children,onClick,text}){
    return(
        <button onClick={onClick} className="btnCautivaAnimation flex justify-center items-center gap-2 m-auto mt-6 px-6 py-4  md:px-4 md:py-2 bg-customBlue text-white rounded-md ">
            <span>{text}</span>
            {children}
        </button>
    )
}


export {CautivaBtnForm}