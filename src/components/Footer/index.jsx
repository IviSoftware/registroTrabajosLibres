import './Footer.css'

const Footer = () =>{
    return (
        <footer className="footerMainer w-full p-4 flex items-center justify-center gap-4 fixed bottom-0 ">
            <a href="https://imin.org.mx/wp-content/uploads/2024/08/Trabajos-libres-.pdf" target='_blank' className="button-link hover:text-customBlue"><b>Descargar convocatoria</b></a>
{/*             <a href="#" className="hover:text-customBlue"><b>Instrucciones para autores</b></a>
            <a href="#" className="hover:text-customBlue"><b>Instrucciones para inscribirse a Nefrología Intervencionista</b></a> */}
        </footer>
    )
}


export {Footer}