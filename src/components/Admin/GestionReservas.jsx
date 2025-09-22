import { useState, useEffect } from 'react'
import { Table, Button, Badge, Modal, Form, Alert } from 'react-bootstrap'
import { obtenerTodasLasReservas, actualizarReserva } from '../../services/reservaService'

const GestionReservas = () => {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedReserva, setSelectedReserva] = useState(null)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchReservas()
  }, [])

  const fetchReservas = async () => {
    try {
      const data = await obtenerTodasLasReservas()
      setReservas(data)
    } catch (error) {
      console.error('Error al obtener reservas:', error)
      setError('Error al cargar las reservas')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (reserva) => {
    setSelectedReserva(reserva)
    setFormData({
      espacioId: reserva.espacioId,
      // fechaHoraInicio: new Date(reserva.fechaHoraInicio).toISOString().slice(0, 16),
      // fechaHoraFin: new Date(reserva.fechaHoraFin).toISOString().slice(0, 16),
      descripcionEvento: reserva.descripcionEvento,
      estado: reserva.estado
    })
    setShowModal(true)
  }

  const handleStatusChange = async (reservaId, nuevoEstado) => {
    try {
      await actualizarReserva({
        id: reservaId,
        estado: nuevoEstado
      })
      setSuccess(`Reserva ${nuevoEstado.toLowerCase()} correctamente`)
      fetchReservas()
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Error al actualizar estado:', error)
      setError('Error al actualizar el estado')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await actualizarReserva({
        id: selectedReserva.id,
        ...formData
      })
      setSuccess('Reserva actualizada correctamente')
      setShowModal(false)
      fetchReservas()
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Error al actualizar reserva:', error)
      setError('Error al actualizar la reserva')
    }
  }

  const getEstadoBadge = (estado) => {
    const variants = {
      PENDIENTE: 'warning',
      CONFIRMADA: 'success',
      CANCELADA: 'danger'
    }
    return <Badge bg={variants[estado]}>{estado}</Badge>
  }

  if (loading) {
    return <div className="text-center py-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Folio</th>
            <th>Espacio</th>
            <th>Fecha/Hora Inicio</th>
            <th>Fecha/Hora Fin</th>
            <th>Solicitante</th>
            <th>Departamento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(reserva => (
            <tr key={reserva.id}>
              <td>{reserva.numeroFolio}</td>
              <td>{reserva.nombreEspacio}</td>
              <td>{new Date(reserva.fechaHoraInicio).toLocaleString()}</td>
              <td>{new Date(reserva.fechaHoraFin).toLocaleString()}</td>
              <td>{reserva.nombreSolicitante}</td>
              <td>{reserva.departamento}</td>
              <td>{getEstadoBadge(reserva.estado)}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-1"
                  onClick={() => handleEdit(reserva)}
                >
                  Editar
                </Button>
                {reserva.estado === 'PENDIENTE' && (
                  <>
                    <Button 
                      variant="outline-success" 
                      size="sm" 
                      className="me-1"
                      onClick={() => handleStatusChange(reserva.id, 'CONFIRMADA')}
                    >
                      Confirmar
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleStatusChange(reserva.id, 'CANCELADA')}
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Reserva</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {selectedReserva && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción del Evento</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.descripcionEvento || ''}
                    onChange={(e) => setFormData({...formData, descripcionEvento: e.target.value})}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={formData.estado || 'PENDIENTE'}
                    onChange={(e) => setFormData({...formData, estado: e.target.value})}
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="CONFIRMADA">Confirmada</option>
                    <option value="CANCELADA">Cancelada</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default GestionReservas