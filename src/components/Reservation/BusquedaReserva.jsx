import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buscarReservaPorFolio, obtenerHistorialReserva } from '../../services/reservaService';
import { Card, Spinner, Alert, ListGroup, Container, Row, Col } from 'react-bootstrap';

const BusquedaReserva = () => {
  const { folio } = useParams();
  const [reserva, setReserva] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const reservaData = await buscarReservaPorFolio(folio);
        const reservaId = reservaData.id
        console.log(reservaId);
        
        const historialData = await obtenerHistorialReserva(reservaId);
        
        setReserva(reservaData);
        setHistorial(historialData);
      } catch (err) {
        setError('No se encontró la reserva o ocurrió un error.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folio]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!reserva) {
    return <Alert variant="warning">No se encontró la reserva.</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Reserva: {reserva.numeroFolio}</Card.Header>
            <Card.Body>
              <Card.Title>{reserva.nombreEspacio}</Card.Title>
              <Card.Text>
                <strong>Usuario:</strong> {reserva.nombreUsuario}<br />
                <strong>Fecha y Hora de Inicio:</strong> {new Date(reserva.fechaHoraInicio).toLocaleString()}<br />
                <strong>Fecha y Hora de Fin:</strong> {new Date(reserva.fechaHoraFin).toLocaleString()}<br />
                <strong>Estado:</strong> {reserva.estado}
              </Card.Text>
            </Card.Body>
          </Card>

          <h2>Historial de Cambios</h2>
          <ListGroup>
            {historial.map(item => (
              <ListGroup.Item key={item.id}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{item.accion}</h5>
                  <small>{new Date(item.fechaCambio).toLocaleString()}</small>
                </div>
                <p className="mb-1">{item.detalles}</p>
                <small>Usuario: {item.usuario}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default BusquedaReserva;
