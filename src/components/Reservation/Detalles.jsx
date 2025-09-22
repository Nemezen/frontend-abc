import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Detalles = ({ formData, updateFormData, nextStep, prevStep }) => {
  const handleNext = () => {
    if (formData.descripcionEvento) {
      nextStep();
    }
  };

  return (
    <div>
      <h4 className="mb-4">Detalles del Evento</h4>
      <Form>
        <Form.Group controlId="descripcionEvento">
          <Form.Label>Descripción del Evento</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={formData.descripcionEvento}
            onChange={(e) => updateFormData('descripcionEvento', e.target.value)}
            placeholder="Ingrese una breve descripción del motivo de la reserva"
          />
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={prevStep}>
          Atrás
        </Button>
        <Button onClick={handleNext} disabled={!formData.descripcionEvento}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default Detalles;