import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { obtenerFechasOcupadas } from "../../services/reservaService";
import { Button, ButtonGroup } from "react-bootstrap";

const localizer = momentLocalizer(moment);

const FechaHora = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [eventos, setEventos] = useState([]);
  const [mode, setMode] = useState("start"); // 'start' or 'end'
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchFechasOcupadas = async () => {
      try {
        const fechasOcupadas = await obtenerFechasOcupadas();
        const eventosOcupados = fechasOcupadas
          .map((fecha, i) => {
            if (i % 2 === 0) {
              return {
                title: "Ocupado",
                start: new Date(fechasOcupadas[i]),
                end: new Date(fechasOcupadas[i + 1]),
              };
            }
            return null;
          })
          .filter(Boolean);
        setEventos(eventosOcupados);
      } catch (error) {
        console.error("Error al obtener fechas ocupadas:", error);
      }
    };

    fetchFechasOcupadas();
  }, []);

  const handleSelectSlot = ({ start }) => {
    if (mode === "start") {
      updateFormData("fechaHoraInicio", start);
      updateFormData("fechaHoraFin", null); // Reset end time when start time is changed
    } else if (mode === "end") {
      if (moment(start).isSameOrBefore(formData.fechaHoraInicio)) {
        alert(
          "La hora de finalización debe ser posterior a la hora de inicio."
        );
        return;
      }
      updateFormData("fechaHoraFin", start);
    }
  };

  const clearSelection = () => {
    updateFormData("fechaHoraInicio", null);
    updateFormData("fechaHoraFin", null);
    setMode("start");
  };

  const getSelectionStatus = () => {
    const { fechaHoraInicio, fechaHoraFin } = formData;
    let status = `Seleccionando hora de: ${
      mode === "start" ? "Inicio" : "Fin"
    }.`;
    if (fechaHoraInicio) {
      status += ` Inicio: ${moment(fechaHoraInicio).format(
        "DD/MM/YYYY HH:mm"
      )}`;
    }
    if (fechaHoraFin) {
      status += ` | Fin: ${moment(fechaHoraFin).format("DD/MM/YYYY HH:mm")}`;
    }
    return status;
  };

  return (
    <div className="h-fit">
      <h2>Selecciona Fecha y Hora</h2>

      <ButtonGroup className="mb-3">
        <Button
          variant={mode === "start" ? "primary" : "secondary"}
          onClick={() => setMode("start")}
        >
          Seleccionar Hora de Inicio
        </Button>
        <Button
          variant={mode === "end" ? "primary" : "secondary"}
          onClick={() => setMode("end")}
          disabled={!formData.fechaHoraInicio}
        >
          Seleccionar Hora de Fin
        </Button>
      </ButtonGroup>

      <p>{getSelectionStatus()}</p>

      {(formData.fechaHoraInicio || formData.fechaHoraFin) && (
        <Button variant="danger" onClick={clearSelection} className="mb-3">
          Limpiar selección
        </Button>
      )}

      <Calendar
        localizer={localizer}
        events={[
          ...eventos,
          formData.fechaHoraInicio && {
            start: formData.fechaHoraInicio,
            end: formData.fechaHoraFin || formData.fechaHoraInicio,
            title: "Mi Reserva",
          },
        ].filter(Boolean)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
        selectable
        view={view}
        views={["month", "week", "day"]}
        onView={(view) => setView(view)}
        date={date}
        onNavigate={(date) => setDate(date)}
      />
      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={prevStep}>
          Atrás
        </Button>
        <Button
          onClick={nextStep}
          disabled={!formData.fechaHoraInicio || !formData.fechaHoraFin}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default FechaHora;
