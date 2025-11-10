import React, { useState, useEffect } from "react";
import '../styles/editPerfil.css';  // Importa el archivo CSS

function EditPerfil() {
      const [fechaNacimiento, setFechaNacimiento] = useState('');
      const [maxFecha, setMaxFecha] = useState('');
    
      useEffect(() => { 
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0]; 
        setMaxFecha(todayFormatted);
  }, 
  []);
    
      const handleFechaChange = (e) => {
        setFechaNacimiento(e.target.value);
      };
      

     
  return (
    <main className="edit-perfil-container">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4"><i className="bi-person-circle"></i> Editar Perfil</h2>

        <form id="formEditarPerfil">

          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-person"></i></span>
            <input type="text" className="form-control" id="usuario" placeholder="Nombre de usuario"
              pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" required />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
            <input type="email" className="form-control" id="correo" placeholder="Correo electrónico" required />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-phone"></i></span>
            <input type="text" className="form-control" id="Celular" placeholder="Celular"
              pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" required />
          </div>


        <div className="mb-3 input-group">
         <span className="input-group-text"><i className="bi bi-gender-ambiguous"></i></span>
            <select 
                className="form-control" 
                id="Sexo" 
                required
             >
            <option value="" disabled selected>Selecciona tu sexo</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
            </select>
        </div>

         <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-cake"></i></span>
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              placeholder="Fecha de nacimiento"
              value={fechaNacimiento}
              onChange={handleFechaChange}
              required
              max={maxFecha}
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-globe-americas"></i></span>
            <input type="text" className="form-control" id="pais" placeholder="Pais"
              pattern="^[A-Za-z]+$" minlength="3" maxlength="30" required />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-buildings"></i></span>
            <input type="text" className="form-control" id="ciudad" placeholder="Ciudad"
              pattern="^[A-Za-z]+$" minlength="3" maxlength="30" required />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
            <input type="text" className="form-control" id="direccion" placeholder="Direccion"
              pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" required />
          </div>


          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-lock"></i></span>
            <input type="password" className="form-control" id="contrasena" placeholder="Contraseña" required />
          </div>
        {/*
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-key"></i></span>
            <input type="password" className="form-control" id="nuevaContrasena" placeholder="Nueva contraseña"
              minlength="6" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" />
          </div>

          <div className="mb-4 input-group">
            <span className="input-group-text"><i className="bi bi-check2-square"></i></span>
            <input type="password" className="form-control" id="confirmarNuevaContrasena"
              placeholder="Confirmar nueva contraseña" minlength="6" />
          </div>//
*/}
          <div className="d-grid">
            <button type="submit" className="btn btn-color btn-lg">Guardar Cambios</button>
          </div>

        </form>
      </div>
    </main>
  );
}

export default EditPerfil;
