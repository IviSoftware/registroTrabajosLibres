import { useState } from 'react';
import Swal from 'sweetalert2';
import { InputCautivaForms } from '../../InputCautivaForms';
import { CautivaBtnForm } from '../../atomos/CautivaBtnForm';
import { GrFormNext } from 'react-icons/gr';
import './CoauthorStage.css';

function CoauthorStage({ setDataModule, dataModule, setStage, setPercentageState, sendDataToAPI }) {
  const [coauthors, setCoauthors] = useState([{ nombre: '', apellidos: '', hospital: '', correo: '' }]);

  const addCoauthor = () => {
    const newCoauthor = { nombre: '', apellidos: '', hospital: '', correo: '' };
    const updatedCoauthors = [...coauthors, newCoauthor];
    setCoauthors(updatedCoauthors);
    updateDataModule(updatedCoauthors);
    console.log('Coautor agregado:', newCoauthor);
  };

  const removeCoauthor = (index) => {
    const element = document.getElementById(`coauthor-${index}`);
    if (element) {
      element.classList.add('slide-out');
      setTimeout(() => {
        const updatedCoauthors = coauthors.filter((_, i) => i !== index);
        setCoauthors(updatedCoauthors);
        updateDataModule(updatedCoauthors);
        console.log('Coautor eliminado, índice:', index);
      }, 300);
    }
  };

  const handleInputChange = (index, field, value) => {
    console.log(`Actualizando coautor en el índice ${index}, campo: ${field}, valor: ${value}`);
    const updatedCoauthors = coauthors.map((coauthor, i) =>
      i === index ? { ...coauthor, [field]: value.trim() } : coauthor
    );
    setCoauthors(updatedCoauthors);
    updateDataModule(updatedCoauthors);
  };

  // Función para actualizar el estado `dataModule` con los datos de los coautores
  const updateDataModule = (updatedCoauthors) => {
    // Aseguramos que dataModule.coautores siempre es un array y actualizamos coautores sin duplicaciones
    const updatedModule = { ...dataModule, coautores: updatedCoauthors };
    setDataModule(updatedModule);
    console.log('Actualización del dataModule:', updatedModule);
  };

  const validateCoauthors = () => {
    for (let coauthor of coauthors) {
      console.log(coauthor, 'coautor');
      if (!coauthor.nombre.trim() || !coauthor.apellidos.trim() || !coauthor.hospital.trim() || !coauthor.correo.trim()) {
        Swal.fire({
          title: 'Faltan datos',
          text: 'Por favor, complete todos los campos de los coautores.',
          icon: 'warning',
        });
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (validateCoauthors()) {
      setStage(8);
      setPercentageState(100);
      sendDataToAPI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <p><b>Información de coautores</b></p>
      {coauthors.map((coauthor, index) => (
        <div key={index} id={`coauthor-${index}`} className="coauthor-block flex flex-col gap-6">
          <InputCautivaForms
            type="text"
            text="Nombre(s)"
            name={`nombre${index}`}
            valueUser={coauthor.nombre}
            onChange={(e) => handleInputChange(index, 'nombre', e.target.value)}
          />
          <InputCautivaForms
            type="text"
            text="Apellidos"
            name={`apellidos${index}`}
            valueUser={coauthor.apellidos}
            onChange={(e) => handleInputChange(index, 'apellidos', e.target.value)}
          />
          <InputCautivaForms
            type="text"
            text="Institución y servicio a la que pertenece*"
            name={`hospital${index}`}
            valueUser={coauthor.hospital}
            onChange={(e) => handleInputChange(index, 'hospital', e.target.value)}
          />
          <InputCautivaForms
            type="text"
            text="Correo Electrónico*"
            name={`correo${index}`}
            valueUser={coauthor.correo}
            onChange={(e) => handleInputChange(index, 'correo', e.target.value)}
          />
          {index > 0 && (
            <button className="remove-btn" onClick={() => removeCoauthor(index)}>
              Eliminar Coautor
            </button>
          )}
        </div>
      ))}

      <button className="add-coauthor-btn" onClick={addCoauthor}>
        + Agregar Coautor
      </button>

      <CautivaBtnForm text="Continuar" onClick={handleContinue}>
        <GrFormNext className="btnIcon" />
      </CautivaBtnForm>
    </div>
  );
}

export { CoauthorStage };
