import React, { useState, useEffect } from "react";
import '../styles/style.css';

function Registrar() {

  const [formData, setFormData] = useState({
     usuario: '',
      nombre: '',
      correo: '',
      celular: '',
      genero: '',
      fechaNacimiento: '',
      pais: '',
      ciudad: '',
      direccion: '',
      codigoDesc: '',
      contrasena: '',
  });

  const [maxFecha, setMaxFecha] = useState('');
  const [modal, setModal] = useState({ show: false, title: '', message: '', type: '' }); // type: 'success' | 'error'

  useEffect(() => {
    // Fecha actual como máximo
    const today = new Date().toISOString().split('T')[0];
    setMaxFecha(today);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contrasena !== formData.confirmarcontrasena) {
      setModal({
        show: true,
        title: 'Error',
        message: 'Las contraseñas no coinciden.',
        type: 'error'
      });
      return;
    }

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    // Verificar si ya existe el usuario o el correo
    const usuarioExistente = usuariosGuardados.find(
      (u) => u.usuario === formData.usuario || u.correo === formData.correo
    );

    if (usuarioExistente) {
      setModal({
        show: true,
        title: 'Error',
        message: 'El usuario o correo ya están registrados.',
        type: 'error'
      });
      return;
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
    usuario: formData.usuario,
  nombre: formData.nombre,
  correo: formData.correo,
  celular: formData.celular || '',
  genero: formData.genero || '',
  fechaNacimiento: formData.fechaNacimiento,
  pais: formData.pais || '',
  ciudad: formData.ciudad || '',
  direccion: formData.direccion || '',
  codigoDesc: formData.codigoDesc || null,
  contrasena: formData.contrasena
    };

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosGuardados));

    setModal({
      show: true,
      title: 'Registro exitoso',
      message: 'El usuario se ha registrado correctamente.',
      type: 'success'
    });

    // Limpiar formulario
    setFormData({
       usuario: '',
       nombre: '',
    correo: '',
    fechaNacimiento: '',
    codigoDesc: '',
    contrasena: '',
    confirmarcontrasena: ''

    });
  };

  const closeModal = () => {
    setModal({ show: false, title: '', message: '', type: '' });
  };

  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center">
      <div className="bg-dark bg-opacity-50 p-5 rounded text-white w-100">
        <h1 className="mb-4 text-center">Registro</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              required
              placeholder="Nombre de usuario"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Solo letras, números o guión"
              value={formData.usuario}
              onChange={handleChange}
            />
          </div>

           <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Nombre </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              placeholder="Nombre "
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Solo letras"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>


          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              placeholder="mail@site.com"
              required
              value={formData.correo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              max={maxFecha}
              required
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="codigoDesc" className="form-label">Código de descuento</label>
            <input
              type="text"
              className="form-control"
              id="codigoDesc"
              placeholder="Código Descuento (opcional)"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Solo letras, números o guión"
              value={formData.codigoDesc}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              placeholder="Contraseña"
              minLength="6"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Debe contener más de 6 caracteres, incluyendo número, mayúscula y minúscula"
              required
              value={formData.contrasena}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmarcontrasena" className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmarcontrasena"
              placeholder="Confirmar contraseña"
              minLength="6"
              required
              value={formData.confirmarcontrasena}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button id="btnRegister" type="submit" className="btn btn-color btn-outline-dark">
              Registrarse
            </button>
          </div>
        </form>
      </div>

      {/* Modal de éxito/error */}
      {modal.show && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div
                className={`modal-header ${modal.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}
              >
                <h5 className="modal-title">{modal.title}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>{modal.message}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Registrar;