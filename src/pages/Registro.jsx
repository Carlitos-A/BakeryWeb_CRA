import React, { useState, useEffect } from "react";
import '../styles/style.css';

function Registrar() {
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [maxFecha, setMaxFecha] = useState('');

  useEffect(() => { //Fecha actual como maximo
    const today = new Date().toISOString().split('T')[0];
    setMaxFecha(today);
  }, []);

  const handleFechaChange = (e) => {
    setFechaNacimiento(e.target.value);
  };

  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center">
      <div className="bg-dark bg-opacity-50 p-5 rounded text-white w-100">
        <h1 className="mb-4 text-center">Registro</h1>
        <form>

          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Nombre de usuario</label>
            <input type="text" className="form-control" id="usuario" required placeholder="Nombre de usuario"
              pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Solo letras, números o guión" />
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" id="correo" placeholder="mail@site.com" required />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={handleFechaChange}
              required
              max={maxFecha}
            />
          </div>

           <div className="mb-3">
            <label htmlFor="codigoDesc" className="form-label">Codigo de descuento</label>
            <input type="text" className="form-control" id="codigoDesc" required placeholder="Codigo Descuento"
              pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Solo letras, números o guión" />
          </div>


          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="contrasena" placeholder="Contraseña" minlength="6"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Debe contener más de 6 caracteres, incluyendo número, mayúscula y minúscula" required />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmarcontrasena" className="form-label">Confirmar contraseña</label>
            <input type="password" className="form-control" id="confirmarcontrasena" placeholder="Confirmar contraseña"
              minlength="6" required />
          </div>

          <div className="d-grid">
            <button id="btnRegister" type="submit" className="btn btn-color btn-outline-dark">Registrarse</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Registrar;
