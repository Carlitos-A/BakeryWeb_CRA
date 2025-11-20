import React, { useState, useEffect } from "react";
import '../styles/Perfil.css';
import Logo from '../assets/img/icons/logo.png';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [maxFecha, setMaxFecha] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeSuccessModal = () => setShowSuccessModal(false);

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuarioActivo) {
      setUsuario({
        apellidoPaterno: usuarioActivo.apellidoPaterno || '',
        apellidoMaterno: usuarioActivo.apellidoMaterno || '',
        usuario: usuarioActivo.usuario || '',
        correo: usuarioActivo.correo || '',
        telefono: usuarioActivo.telefono || '',
        fechaNacimiento: usuarioActivo.fechaNacimiento || '',
        pais: usuarioActivo.pais || '',
        ciudad: usuarioActivo.ciudad || '',
        direccion: usuarioActivo.direccion || '',
        codigoDesc: usuarioActivo.codigoDesc || '',
        estado: usuarioActivo.estado || ''
      });
    }
    const today = new Date();
    setMaxFecha(today.toISOString().split('T')[0]);
  }, []);

  if (!usuario) {
    return (
      <main className="perfil-main text-center">
        <p>Cargando perfil...</p>
      </main>
    );
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario(prev => ({ ...prev, [id]: value }));
  };

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuariosActualizados = usuariosRegistrados.map(u =>
      u.usuario === usuario.usuario ? usuario : u
    );
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosActualizados));
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    setEditando(false);
    setShowSuccessModal(true);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    if (editando) {
      handleGuardarCambios(e);
    } else {
      setEditando(true);
    }
  };

  return (
    <main className="perfil-main">
      <div className="perfil-box">
        <div className="perfil-header text-center mb-4">
          <img src={Logo} alt="Logo" className="perfil-logo rounded-circle" />
          <h2 className="perfil-titulo">Mi perfil</h2>
        </div>

        <div className="perfil-form-card shadow-sm p-4">
          <form autoComplete="off">
            {/** Apellido Paterno */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Apellido Paterno:</span>
              {editando ? (
                <input type="text" id="apellidoPaterno" value={usuario.apellidoPaterno} onChange={handleChange} className="perfil-input" required />
              ) : (
                <span className="perfil-texto bg-light">{usuario.apellidoPaterno || '...'}</span>
              )}
            </div>

            {/** Apellido Materno */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Apellido Materno:</span>
              {editando ? (
                <input type="text" id="apellidoMaterno" value={usuario.apellidoMaterno} onChange={handleChange} className="perfil-input" required />
              ) : (
                <span className="perfil-texto bg-light">{usuario.apellidoMaterno || '...'}</span>
              )}
            </div>

            {/** Usuario */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Usuario:</span>
              {editando ? (
                <input type="text" id="usuario" value={usuario.usuario} onChange={handleChange} className="perfil-input" required />
              ) : (
                <span className="perfil-texto bg-light">{usuario.usuario || '...'}</span>
              )}
            </div>

            {/** Correo */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Correo:</span>
              {editando ? (
                <input type="email" id="correo" value={usuario.correo} onChange={handleChange} className="perfil-input" required />
              ) : (
                <span className="perfil-texto bg-light">{usuario.correo || '...'}</span>
              )}
            </div>

            {/** Teléfono */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Teléfono:</span>
              {editando ? (
                <input type="number" id="telefono" value={usuario.telefono} onChange={handleChange} className="perfil-input" />
              ) : (
                <span className="perfil-texto bg-light">{usuario.telefono || '...'}</span>
              )}
            </div>

            {/** Fecha de nacimiento */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Fecha de Nacimiento:</span>
              {editando ? (
                <input type="date" id="fechaNacimiento" value={usuario.fechaNacimiento} onChange={handleChange} className="perfil-input" max={maxFecha} />
              ) : (
                <span className="perfil-texto bg-light">{usuario.fechaNacimiento || '...'}</span>
              )}
            </div>

            {/** País */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">País:</span>
              {editando ? (
                <input type="text" id="pais" value={usuario.pais} onChange={handleChange} className="perfil-input" />
              ) : (
                <span className="perfil-texto bg-light">{usuario.pais || '...'}</span>
              )}
            </div>

            {/** Ciudad */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Ciudad:</span>
              {editando ? (
                <input type="text" id="ciudad" value={usuario.ciudad} onChange={handleChange} className="perfil-input" />
              ) : (
                <span className="perfil-texto bg-light">{usuario.ciudad || '...'}</span>
              )}
            </div>

            {/** Dirección */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Dirección:</span>
              {editando ? (
                <input type="text" id="direccion" value={usuario.direccion} onChange={handleChange} className="perfil-input" />
              ) : (
                <span className="perfil-texto bg-light">{usuario.direccion || '...'}</span>
              )}
            </div>

            {/** Código de descuento */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Código de Descuento:</span>
              {editando ? (
                <input type="text" id="codigoDesc" value={usuario.codigoDesc} onChange={handleChange} className="perfil-input" />
              ) : (
                <span className="perfil-texto bg-light">{usuario.codigoDesc || '...'}</span>
              )}
            </div>

            {/** Estado */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Estado:</span>
              {editando ? (
                <input type="text" id="estado" value={usuario.estado} onChange={handleChange} className="perfil-input" />
              ) : (
                <span className="perfil-texto bg-light">{usuario.estado || '...'}</span>
              )}
            </div>

            {/** Botón Editar/Guardar */}
            <div className="text-center mb-3">
              <button onClick={handleEditClick} className="perfil-btn btn-lg">
                {editando ? 'Guardar Cambios' : 'Editar'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Éxito</h5>
                <button type="button" className="btn-close" onClick={closeSuccessModal}></button>
              </div>
              <div className="modal-body">
                <p>Los cambios se han guardado correctamente.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeSuccessModal}>
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

export default Perfil;