import React, { useState, useEffect } from "react";
import '../styles/Perfil.css';
import Logo from '../assets/img/icons/logo.png';
import axios from 'axios';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [maxFecha, setMaxFecha] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const closeSuccessModal = () => setShowSuccessModal(false);
  const closeErrorModal = () => setShowErrorModal(false);


  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('No se encontró token de autenticación');
          setShowErrorModal(true);
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8081/Usuarios/Personal', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': '123456789ABCDEF'
          }
        });

        const usuarioData = response.data;
        setUsuario({
          apellidoPaterno: usuarioData.apellidoPaterno || '',
          apellidoMaterno: usuarioData.apellidoMaterno || '',
          usuario: usuarioData.usuario || '',
          nombre: usuarioData.nombre || '',
          correo: usuarioData.correo || '',
          telefono: usuarioData.telefono || '',
          fechaNacimiento: usuarioData.fechaNacimiento || '',
          pais: usuarioData.pais || '',
          ciudad: usuarioData.ciudad || '',
          direccion: usuarioData.direccion || '',
          estado: usuarioData.estado || ''
        });

        const today = new Date();
        setMaxFecha(today.toISOString().split('T')[0]);
        setLoading(false);

      } catch (error) {
        console.error('Error al cargar datos:', error);
        setErrorMessage('Error al cargar los datos del perfil');
        setShowErrorModal(true);
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) {
    return (
      <main className="perfil-main text-center">
        <p>Cargando perfil...</p>
      </main>
    );
  }

  if (!usuario) {
    return (
      <main className="perfil-main text-center">
        <p>No se pudo cargar el perfil</p>
      </main>
    );
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario(prev => ({ ...prev, [id]: value }));
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('No se encontró token de autenticación');
      setShowErrorModal(true);
      return;
    }

    const payload = {
      apellidoPaterno: usuario.apellidoPaterno,
      apellidoMaterno: usuario.apellidoMaterno,
      usuario: usuario.usuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
      fechaNacimiento: usuario.fechaNacimiento,
      pais: usuario.pais,
      ciudad: usuario.ciudad,
      direccion: usuario.direccion,
      estado: usuario.estado
    };

    try {
      const response = await axios.put('http://localhost:8081/Usuarios/Editar', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': '123456789ABCDEF',
          'Content-Type': 'application/json'
        }
      });


      localStorage.setItem('usuarioActivo', JSON.stringify(response.data));
      
      window.dispatchEvent(new Event('usuarioActualizado'));

      setEditando(false);
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error al guardar cambios:', error);
      
      if (error.response?.status === 401) {
        setErrorMessage('Sesión expirada. Por favor inicia sesión nuevamente.');
      } else if (error.response?.status === 400) {
        setErrorMessage(error.response.data?.message || 'Datos inválidos. Verifica los campos.');
      } else {
        setErrorMessage('Error al guardar los cambios. Intenta nuevamente.');
      }
      
      setShowErrorModal(true);
    }
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
            {/** Nombre */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Nombre:</span>
              {editando ? (
                <input type="text" id="nombre" value={usuario.nombre} onChange={handleChange} className="perfil-input" required />
              ) : (
                <span className="perfil-texto bg-light">{usuario.nombre || '...'}</span>
              )}
            </div>

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
              <span className="perfil-texto bg-light">{usuario.usuario}</span>
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
                <input type="tel" id="telefono" value={usuario.telefono} onChange={handleChange} className="perfil-input" />
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

            {/** Estado */}
            <div className="perfil-input-group mb-3">
              <span className="perfil-label">Estado:</span>
              <span className="perfil-texto bg-light">{usuario.estado || '...'}</span>
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

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Éxito</h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeSuccessModal}></button>
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

      {/* Modal de Error */}
      {showErrorModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Error</h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeErrorModal}></button>
              </div>
              <div className="modal-body">
                <p>{errorMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeErrorModal}>
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