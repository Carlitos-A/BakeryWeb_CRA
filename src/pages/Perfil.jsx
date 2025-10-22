import React, { useState, useEffect } from "react";
import '../styles/editPerfil.css';  // Importa el archivo CSS
import Logo from '../assets/img/icons/logo.png'

function Perfil() {
  
  const [usuario, setUsuario] = useState({
    nombre: 'Juan Pérez',
    correo: 'juan@example.com',
    celular: '123456789',
    genero: 'masculino',
    fechaNacimiento: '1990-01-01',
    pais: 'México',
    ciudad: 'Ciudad de México',
    direccion: 'Avenida Siempre Viva 123',
    contraseña: '123456', // Mostrar contraseña como oculta por seguridad
  });
    const [editando, setEditando] = useState(false);
  const [maxFecha, setMaxFecha] = useState('');
 

  // Fecha máxima para el campo de nacimiento (la fecha de hoy)
  useEffect(() => {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0]; 
    setMaxFecha(todayFormatted);
  }, []);
  

  const [contraseñaActual, setContraseñaActual] = useState('');
  const [contraseñaIncorrecta, setContraseñaIncorrecta] = useState(false); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [id]: value,
    }));
  };

  // Función que maneja el guardado de cambios
  const handleGuardarCambios = (e) => {
    e.preventDefault(); // Prevenir recarga de la página

    // Verificar si la contraseña actual ingresada es correcta
    if (contraseñaActual !== usuario.contraseña) {
      setContraseñaIncorrecta(true); // Si es incorrecta, mostrar mensaje de error
      return; // No continuar si la contraseña es incorrecta
    }

    // Si la contraseña es correcta, proceder a guardar los cambios
    console.log('Cambios guardados correctamente');
    setContraseñaIncorrecta(false); // Ocultar el mensaje de error
    setEditando(false); // Cambiar el estado de edición a falso
    // Aquí puedes realizar una llamada a la API para guardar los cambios en el servidor
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // Aseguramos que se prevenga el comportamiento predeterminado del botón

    if (editando) {
      // Si está editando y el botón es "Guardar", solo validamos la contraseña
      handleGuardarCambios(e); // Pasamos el evento correctamente
    } else {
      // Si no está editando, cambia el estado a editar
      setEditando(true);
    }
  };

  return (
    <main className="edit-perfil-container">
      <div className="perfil-header">
        {/* Imagen de perfil alineada a la derecha */}
        <div className="perfil-imagen">
          <img 
            src={Logo}  // Usamos la variable 'Logo' como la fuente
            alt="Imagen de perfil"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="perfil-info">
          <h2 className="text-center mb-4">Mi perfil</h2>
          <div className="card shadow-sm p-4">
            <form id="formEditarPerfil">

              {/* Campos del formulario */}
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-person"> Nombre: </i></span>
                 {editando ? (
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre de usuario"
                  value={usuario.nombre}
                  onChange={handleChange}
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minlength="3"
                  maxlength="30"
                  required
                />) : (
                 <span className="form-control bg-light text-muted">{usuario.nombre || '...'}</span>
                 )}
              </div>
             

          {/* Campo Correo electrónico */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-envelope"> Correo Electronico: </i></span>
            {editando ? (
            <input 
              type="email" 
              className="form-control" 
              id="correo" 
              placeholder="Correo electrónico" 
              value={usuario.correo}
              onChange={handleChange}
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.correo || '...'}</span>
                 )}
          </div>

          {/* Campo Celular */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-phone"> Celular: </i></span>
            {editando ? (
            <input 
              type="text" 
              className="form-control" 
              id="celular" 
              placeholder="Celular"
              value={usuario.celular}
              onChange={handleChange}
              pattern="[A-Za-z][A-Za-z0-9\-]*" 
              minlength="3" 
              maxlength="30" 
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.celular || '...'}</span>
                 )}
          </div>

          {/* Campo Sexo */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-gender-ambiguous"> Genero: </i></span>
            {editando ? (
            <select 
              className="form-control" 
              id="genero" 
              value={usuario.genero} 
              onChange={handleChange} 
              required
            >
              <option value="" disabled>Selecciona tu genero</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>) : (
                 <span className="form-control bg-light text-muted">{usuario.genero || '...'}</span>
                 )}
          </div>

          {/* Campo Fecha de nacimiento */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-cake"> Fecha de Nacimiento: </i></span>
           {editando ? (
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              value={usuario.fechaNacimiento}
              onChange={handleChange}
              required
              max={maxFecha}
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.fechaNacimiento || '...'}</span>
                 )}
          </div>

          {/* Campo País */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-globe-americas"> Pais: </i></span>
            {editando ? (
            <input 
              type="text" 
              className="form-control" 
              id="pais" 
              placeholder="Pais"
              value={usuario.pais}
              onChange={handleChange}
              pattern="^[A-Za-z]+$" 
              minlength="3" 
              maxlength="30" 
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.pais || '...'}</span>
                 )}
          </div>

          {/* Campo Ciudad */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-buildings"> Ciudad: </i></span>
            {editando ? (
            <input 
              type="text" 
              className="form-control" 
              id="ciudad" 
              placeholder="Ciudad"
              value={usuario.ciudad}
              onChange={handleChange}
              pattern="^[A-Za-z]+$" 
              minlength="3" 
              maxlength="30" 
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.ciudad || '...'}</span>
                 )}
          </div>

          {/* Campo Dirección */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-geo-alt">  Dirección: </i></span>
            {editando ? (
            <input 
              type="text" 
              className="form-control" 
              id="direccion" 
              placeholder="Dirección"
              value={usuario.direccion}
              onChange={handleChange}
              pattern="[A-Za-z][A-Za-z0-9\-]*" 
              minlength="3" 
              maxlength="30" 
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.direccion || '...'}</span>
                 )}
          </div>

          {/* Campo Contraseña */}
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-lock"></i></span>
            <input 
              type="password" 
              className="form-control" 
              id="contrasena" 
              value={contraseñaActual}
              onChange={(e) => setContraseñaActual(e.target.value)}
              placeholder="Contraseña Actual"
              required 
            />) 
          </div>
         {contraseñaIncorrecta && (
        <div className="text-danger mb-3">
          La contraseña actual es incorrecta. Por favor, inténtalo de nuevo.
        </div>
      )}

      {/* Botón Editar/Guardar */}
      <div className="mb-3">
        <button
          onClick={handleEditClick} // Pasa el evento correctamente aquí
          className="btn btn-color btn-lg"
        >
          {editando ? 'Guardar Cambios' : 'Editar'}
        </button>
      </div>
            </form>
          </div>
        </div>
      </div>

       
      
    </main>
  );
};

export default Perfil;
