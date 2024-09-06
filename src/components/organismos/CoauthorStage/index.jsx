import { useState } from 'react';
import Swal from 'sweetalert2';
import { InputCautivaForms } from '../../InputCautivaForms';
import { CautivaBtnForm } from '../../atomos/CautivaBtnForm';
import { GrFormNext } from 'react-icons/gr';
import './CoauthorStage.css';

function CoauthorStage({ setDataModule, dataModule, setStage, setPercentageState }) {
  const [coauthors, setCoauthors] = useState([{ id: 1, nombre: '', apellidos: '', hospital: '', email: '' }]);
  const [coauthorCounter, setCoauthorCounter] = useState(2);

  const addCoauthor = () => {
    const newCoauthor = { id: coauthorCounter, nombre: '', apellidos: '', hospital: '', email: '' };
    const updatedCoauthors = [...coauthors, newCoauthor];
    setCoauthors(updatedCoauthors);
    updateDataModule(updatedCoauthors);
    setCoauthorCounter(coauthorCounter + 1);
    console.log('Coautor agregado:', newCoauthor);
  };

  const removeCoauthor = (id) => {
    const element = document.getElementById(`coauthor-${id}`);
    if (element) {
      element.classList.add('slide-out');
      setTimeout(() => {
        const updatedCoauthors = coauthors.filter(coauthor => coauthor.id !== id);
        setCoauthors(updatedCoauthors);
        updateDataModule(updatedCoauthors);
        console.log('Coautor eliminado, ID:', id);
      }, 300);
    }
  };

  const handleInputChange = (id, field, value) => {
    console.log(`Actualizando coautor con ID ${id}, campo: ${field}, valor: ${value}`);
    const updatedCoauthors = coauthors.map(coauthor =>
      coauthor.id === id ? { ...coauthor, [field]: value.trim() } : coauthor
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
      if (!coauthor.nombre.trim() || !coauthor.apellidos.trim() || !coauthor.hospital.trim() || !coauthor.email.trim()) {
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {coauthors.map((coauthor, index) => (
        <div key={coauthor.id} id={`coauthor-${coauthor.id}`} className="coauthor-block flex flex-col gap-6">
          <InputCautivaForms
            type="text"
            text="Nombre(s)"
            name={`nombre${coauthor.id}`}
            valueUser={coauthor.nombre}
            onChange={(e) => handleInputChange(coauthor.id, 'nombre', e.target.value)}
          />
          <InputCautivaForms
            type="text"
            text="Apellidos"
            name={`apellidos${coauthor.id}`}
            valueUser={coauthor.apellidos}
            onChange={(e) => handleInputChange(coauthor.id, 'apellidos', e.target.value)}
          />
          <InputCautivaForms
            type="text"
            text="Institución y servicio a la que pertenece*"
            name={`hospital${coauthor.id}`}
            valueUser={coauthor.hospital}
            onChange={(e) => handleInputChange(coauthor.id, 'hospital', e.target.value)}
          />
          <InputCautivaForms
            type="text"
            text="Correo Electrónico*"
            name={`email${coauthor.id}`}
            valueUser={coauthor.email}
            onChange={(e) => handleInputChange(coauthor.id, 'email', e.target.value)}
          />
          {index > 0 && (
            <button className="remove-btn" onClick={() => removeCoauthor(coauthor.id)}>
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
