import React, { useState, useEffect } from 'react';
import { Button, Card, Spinner, Alert } from 'react-bootstrap';
import { obtenerEspacioPorId } from '../../services/espacioService';
import moment from 'moment';

const Confirmacion = ({ formData, onSubmit, prevStep, loading, error, reservaCreada }) => {
  const [espacio, setEspacio] = useState(null);
  const [loadingEspacio, setLoadingEspacio] = useState(true);

  useEffect(() => {
    const fetchEspacio = async () => {
      if (!formData.espacioId) return;
      try {
        setLoadingEspacio(true);
        const data = await obtenerEspacioPorId(formData.espacioId);
        setEspacio(data);
      } catch (err) {
        console.error("Error al obtener el espacio:", err);
      } finally {
        setLoadingEspacio(false);
      }
    };

    fetchEspacio();
  }, [formData.espacioId]);

  if (reservaCreada) {
    return (
      <Alert variant="success">
        <Alert.Heading>¡Reserva Creada con Éxito!</Alert.Heading>
        <p>
          Tu reserva para el espacio <strong>{espacio?.nombre}</strong> ha sido registrada correctamente.
        </p>
        <hr />
        <p className="mb-0">
          Numero de folio: {reservaCreada.numeroFolio}
        </p>
      </Alert>
    );
  }

  if (loadingEspacio) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <h4 className="mb-4">Confirmar Reserva</h4>
      {espacio && (
        <Card>
          <Card.Body>
            <Card.Title>{espacio.nombre}</Card.Title>
            <Card.Text>
              <strong>Fecha y Hora de Inicio:</strong>
              <p>{moment(formData.fechaHoraInicio).format('DD/MM/YYYY, h:mm a')}</p>
              <strong>Fecha y Hora de Fin:</strong>
              <p>{moment(formData.fechaHoraFin).format('DD/MM/YYYY, h:mm a')}</p>
              <strong>Descripción del evento:</strong>
              <p>{formData.descripcionEvento}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={prevStep} disabled={loading}>
          Atrás
        </Button>
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Confirmar Reserva'}
        </Button>
      </div>
    </div>
  );
};

export default Confirmacion;